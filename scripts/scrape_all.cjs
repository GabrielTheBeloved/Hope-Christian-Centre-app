const fs = require('fs');
const path = require('path');

function decodeEntities(encodedString) {
  if (!encodedString) return '';
  const translate_re = /&(nbsp|amp|quot|lt|gt|#8217|#8216|#8220|#8221|#8211|#8212|#038|#8230|eacute|egrave|agrave|aacute|oacute|ograve|ugrave|uacute|icirc|acirc|eicirc|ocirc|ucirc);/g;
  const translate = {
    "nbsp": " ",
    "amp": "&",
    "quot": "\"",
    "lt": "<",
    "gt": ">",
    "#8217": "'",
    "#8216": "'",
    "#8220": "\"",
    "#8221": "\"",
    "#8211": "-",
    "#8212": "—",
    "#038": "&",
    "#8230": "...",
    "eacute": "é",
    "egrave": "è",
    "agrave": "à",
    "aacute": "á",
    "oacute": "ó",
    "ograve": "ò",
    "ugrave": "ù",
    "uacute": "ú",
    "icirc": "î",
    "acirc": "â",
    "eicirc": "ê",
    "ocirc": "ô",
    "ucirc": "û"
  };
  return encodedString.replace(translate_re, function(match, entity) {
    return translate[entity] || match;
  }).replace(/&#(\d+);/g, function(match, numStr) {
    var num = parseInt(numStr, 10);
    return String.fromCharCode(num);
  });
}

function cleanHtmlToText(html) {
  if (!html) return '';
  let str = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<[^>]+>/g, '');
  return decodeEntities(str).trim();
}

function parseVerses(rawContent) {
  const text = cleanHtmlToText(rawContent);
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  const verses = [];
  let currentVerseNumber = 1;
  let currentLines = [];
  let chorusLines = [];
  let inChorus = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check if verse header like "1.", "2.", "3." or "Egbe:" / "Egbe" / "Chorus:"
    const verseMatch = line.match(/^(\d+)[\.\s]+(.*)/);
    const chorusMatch = line.match(/^(?:Egbe|Chorus|Ègbè|EGBE)[\:\.\s]*(.*)/i);

    if (chorusMatch) {
      if (currentLines.length > 0) {
        verses.push({ number: currentVerseNumber, text: currentLines.join('\n') });
        currentLines = [];
      }
      inChorus = true;
      if (chorusMatch[1].trim()) {
        chorusLines.push(chorusMatch[1].trim());
      }
    } else if (verseMatch) {
      if (inChorus && chorusLines.length > 0) {
        // chorus finished
        inChorus = false;
      }
      if (currentLines.length > 0) {
        verses.push({ number: currentVerseNumber, text: currentLines.join('\n') });
        currentLines = [];
      }
      currentVerseNumber = parseInt(verseMatch[1], 10);
      if (verseMatch[2].trim()) {
        currentLines.push(verseMatch[2].trim());
      }
    } else {
      if (inChorus) {
        chorusLines.push(line);
      } else {
        currentLines.push(line);
      }
    }
  }

  if (currentLines.length > 0) {
    verses.push({ number: currentVerseNumber, text: currentLines.join('\n') });
  }

  return {
    rawText: text,
    verses: verses.length > 0 ? verses : [{ number: 1, text }],
    chorus: chorusLines.length > 0 ? chorusLines.join('\n') : undefined
  };
}

// Liturgical classification rules based on Yoruba keywords and hymn themes
function determineLiturgicalSeason(title, text, number) {
  const combined = (title + ' ' + text).toLowerCase();
  
  if (combined.includes('kristi b') || combined.includes('bethlehem') || combined.includes('keresimesi') || combined.includes('omodan') || combined.includes('iteloba') || combined.includes('immanuel') || (number >= 85 && number <= 120)) {
    return 'Christmas & Epiphany';
  }
  if (combined.includes('ajinde') || combined.includes('jinde') || combined.includes('iku ko l') || combined.includes('alleluia') || (number >= 150 && number <= 190)) {
    return 'Easter & Resurrection';
  }
  if (combined.includes('agbelebu') || combined.includes('calvary') || combined.includes('eje re') || combined.includes('irora') || combined.includes('tente l') || (number >= 121 && number <= 149)) {
    return 'Lent & Passion';
  }
  if (combined.includes('emi mimo') || combined.includes('pentikosti') || combined.includes('goke re orun') || (number >= 191 && number <= 220)) {
    return 'Ascension & Pentecost';
  }
  if (combined.includes('owuro') || combined.includes('orun yo') || combined.includes('ile mo') || combined.includes('titun l') || (number >= 15 && number <= 45)) {
    return 'Morning Prayer';
  }
  if (combined.includes('irole') || combined.includes('ale') || combined.includes('oorun wo') || combined.includes('ba mi gbe') || combined.includes('ojo lo') || (number >= 46 && number <= 84)) {
    return 'Evening Prayer';
  }
  if (combined.includes('iyin') || combined.includes('ope') || combined.includes('yin baba') || combined.includes('halleluyah') || combined.includes('oba ogo') || (number >= 1 && number <= 14)) {
    return 'Praise & Adoration';
  }
  if (combined.includes('ounje ale') || combined.includes('onje oluwa') || combined.includes('sakramenti') || combined.includes('tebomi') || combined.includes('baptisi')) {
    return 'Communion & Baptism';
  }
  if (combined.includes('orun') || combined.includes('jerusalem') || combined.includes('ile ibukun') || combined.includes('isimi') || combined.includes('pada wa')) {
    return 'Second Coming & Heaven';
  }
  if (combined.includes('adura') || combined.includes('gbo adura') || combined.includes('bebe')) {
    return 'Prayer & Intercession';
  }
  return 'General Worship & Thanksgiving';
}

function extractHymnNumber(post) {
  // First try slug e.g. "1-2", "225-2", "99-2", "jesu-l-olusagutan-mi"
  const slugMatch = post.slug.match(/^(\d+)(?:-\d+)?$/);
  if (slugMatch) {
    return parseInt(slugMatch[1], 10);
  }
  // Try title or content
  const titleMatch = post.title.rendered.match(/(?:Hymn|Orin|No\.?|#)?\s*(\d+)/i);
  if (titleMatch) {
    return parseInt(titleMatch[1], 10);
  }
  return null;
}

// Well known Yoruba Baptist hymn english counterparts and meters
const KNOWN_HYMNS_META = {
  1: { englishTitle: "Praise God From Whom All Blessings Flow", meter: "L.M. (8.8.8.8)", tune: "Old 100th" },
  2: { englishTitle: "Come, We That Love the Lord", meter: "S.M. (6.6.8.6)", tune: "St. Thomas / Marching to Zion" },
  3: { englishTitle: "All People That On Earth Do Dwell", meter: "L.M. (8.8.8.8)", tune: "Old 100th" },
  4: { englishTitle: "Lift Up Your Heads, Ye Mighty Gates", meter: "L.M. (8.8.8.8)", tune: "Truro / Macht hoch die Tür" },
  5: { englishTitle: "Holy, Holy, Holy! Lord God Almighty", meter: "11.12.12.10", tune: "Nicaea" },
  6: { englishTitle: "O Worship the King, All Glorious Above", meter: "10.10.11.11", tune: "Hanover / Lyons" },
  7: { englishTitle: "Joyful, Joyful We Adore Thee", meter: "8.7.8.7.D", tune: "Hymn to Joy" },
  8: { englishTitle: "Praise to the Lord, the Almighty", meter: "14.14.4.7.8", tune: "Lobe den Herren" },
  9: { englishTitle: "When Morning Gilds the Skies", meter: "6.6.6.D", tune: "Laudes Domini" },
  10: { englishTitle: "Great Is Thy Faithfulness", meter: "11.10.11.10 with Refrain", tune: "Faithfulness" },
  17: { englishTitle: "Awake, My Soul, and with the Sun", meter: "L.M. (8.8.8.8)", tune: "Morning Hymn" },
  46: { englishTitle: "Abide with Me, Fast Falls the Eventide", meter: "10.10.10.10", tune: "Eventide" },
  50: { englishTitle: "Sun of My Soul, Thou Saviour Dear", meter: "L.M. (8.8.8.8)", tune: "Hursley" },
  85: { englishTitle: "O Come, All Ye Faithful", meter: "Irregular", tune: "Adeste Fideles" },
  86: { englishTitle: "Hark! The Herald Angels Sing", meter: "7.7.7.7.D with Refrain", tune: "Mendelssohn" },
  88: { englishTitle: "Silent Night, Holy Night", meter: "Irregular", tune: "Stille Nacht" },
  98: { englishTitle: "O Come, All Ye Faithful (Wa Enyin Oloto)", meter: "Irregular", tune: "Adeste Fideles" },
  125: { englishTitle: "When I Survey the Wondrous Cross", meter: "L.M. (8.8.8.8)", tune: "Rockingham" },
  152: { englishTitle: "Christ the Lord Is Risen Today", meter: "7.7.7.7 with Alleluias", tune: "Easter Hymn" },
  153: { englishTitle: "The Strife Is O'er, the Battle Done", meter: "8.8.8 with Alleluias", tune: "Victory" },
  192: { englishTitle: "Breathe on Me, Breath of God", meter: "S.M. (6.6.8.6)", tune: "Trentham" },
  225: { englishTitle: "The Lord's My Shepherd, I'll Not Want", meter: "C.M. (8.6.8.6)", tune: "Crimond" },
  280: { englishTitle: "Blessed Assurance, Jesus Is Mine", meter: "9.10.9.9 with Refrain", tune: "Assurance" },
  300: { englishTitle: "Rock of Ages, Cleft for Me", meter: "7.7.7.7.7.7", tune: "Toplady" },
  325: { englishTitle: "Amazing Grace! How Sweet the Sound", meter: "C.M. (8.6.8.6)", tune: "New Britain" },
  350: { englishTitle: "What a Friend We Have in Jesus", meter: "8.7.8.7.D", tune: "Converse" },
  370: { englishTitle: "Guide Me, O Thou Great Jehovah", meter: "8.7.8.7.8.7", tune: "Cwm Rhondda" },
  400: { englishTitle: "To God Be the Glory", meter: "11.11.11.11 with Refrain", tune: "To God Be the Glory" },
  450: { englishTitle: "Take My Life and Let It Be", meter: "7.7.7.7", tune: "Mozart / Hendon" },
  500: { englishTitle: "Stand Up, Stand Up for Jesus", meter: "7.6.7.6.D", tune: "Webb" },
  550: { englishTitle: "Onward, Christian Soldiers", meter: "6.5.6.5.D with Refrain", tune: "St. Gertrude" },
  600: { englishTitle: "Jerusalem the Golden", meter: "7.6.7.6.D", tune: "Ewing" },
};

async function scrapeAllHymns() {
  console.log("Starting scraping of all Yoruba Baptist Hymns...");
  const allPosts = [];
  const totalPages = 7;

  for (let page = 1; page <= totalPages; page++) {
    console.log(`Fetching page ${page}/${totalPages}...`);
    try {
      const res = await fetch(`https://yorubabaptisthymns.com/wp-json/wp/v2/posts?per_page=100&page=${page}`);
      if (!res.ok) {
        console.error(`Error fetching page ${page}: status ${res.status}`);
        continue;
      }
      const posts = await res.json();
      allPosts.push(...posts);
      console.log(`Page ${page} fetched (${posts.length} posts). Total so far: ${allPosts.length}`);
    } catch (err) {
      console.error(`Exception fetching page ${page}:`, err.message);
    }
  }

  console.log(`Successfully downloaded ${allPosts.length} posts.`);

  // Process hymns
  const hymnsMap = new Map();
  let fallbackNumber = 660;

  for (const post of allPosts) {
    let hymnNumber = extractHymnNumber(post);
    if (!hymnNumber) {
      // If no explicit number in slug, try to match by title
      if (post.slug === 'jesu-l-olusagutan-mi') {
        hymnNumber = 225; // standard Psalm 23 hymn
      } else {
        hymnNumber = fallbackNumber++;
      }
    }

    const title = decodeEntities(post.title.rendered).trim();
    const parsed = parseVerses(post.content.rendered);
    const meta = KNOWN_HYMNS_META[hymnNumber] || {};
    const liturgicalSeason = determineLiturgicalSeason(title, parsed.rawText, hymnNumber);

    const hymn = {
      id: `ybh-${hymnNumber}`,
      number: hymnNumber,
      title: title,
      englishTitle: meta.englishTitle || `Hymn ${hymnNumber}`,
      meter: meta.meter || "L.M. / C.M. / S.M.",
      tune: meta.tune || `Yoruba Melody ${hymnNumber}`,
      denomination: "Yoruba Baptist / Evangelical",
      liturgicalSeason: liturgicalSeason,
      verses: parsed.verses,
      chorus: parsed.chorus,
      rawText: parsed.rawText,
      slug: post.slug,
      wpPostId: post.id
    };

    hymnsMap.set(hymnNumber, hymn);
  }

  const hymnsArray = Array.from(hymnsMap.values()).sort((a, b) => a.number - b.number);
  console.log(`Processed ${hymnsArray.length} unique hymns.`);

  const outDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outFile = path.join(outDir, 'hymnsData.json');
  fs.writeFileSync(outFile, JSON.stringify(hymnsArray, null, 2), 'utf-8');
  console.log(`Saved dataset to ${outFile} (file size: ${(fs.statSync(outFile).size / 1024).toFixed(1)} KB)`);
}

scrapeAllHymns().catch(console.error);

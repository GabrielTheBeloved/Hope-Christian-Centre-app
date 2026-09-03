import { SundaySchoolLesson } from '../types';

// Pairings for translating Yoruba Bible book references to English
const YORUBA_TO_ENGLISH_PAIRS: [string, string][] = [
  ['1 Jòhánù', '1 John'],
  ['2 Jòhánù', '2 John'],
  ['3 Jòhánù', '3 John'],
  ['Jòhánù', 'John'],
  ['1 Johanu', '1 John'],
  ['2 Johanu', '2 John'],
  ['3 Johanu', '3 John'],
  ['Johanu', 'John'],
  ['1 Pétérù', '1 Peter'],
  ['2 Pétérù', '2 Peter'],
  ['1 Peteru', '1 Peter'],
  ['2 Peteru', '2 Peter'],
  ['Lúùkù', 'Luke'],
  ['Luka', 'Luke'],
  ['Mátíù', 'Matthew'],
  ['Matteu', 'Matthew'],
  ['Matiu', 'Matthew'],
  ['Máàkù', 'Mark'],
  ['Maaku', 'Mark'],
  ['Iṣẹ́ Àpọ́sítélì', 'Acts'],
  ['Iṣẹ Awọn Apọsteli', 'Acts'],
  ['Iṣẹ Apọsteli', 'Acts'],
  ['Róòmù', 'Romans'],
  ['Romu', 'Romans'],
  ['1 Kọ́ríńtì', '1 Corinthians'],
  ['2 Kọ́ríńtì', '2 Corinthians'],
  ['1 Korinti', '1 Corinthians'],
  ['2 Korinti', '2 Corinthians'],
  ['Gálátíà', 'Galatians'],
  ['Galatia', 'Galatians'],
  ['Éfésù', 'Ephesians'],
  ['Efesu', 'Ephesians'],
  ['Fílípì', 'Philippians'],
  ['Filipi', 'Philippians'],
  ['Kólósè', 'Colossians'],
  ['Kolose', 'Colossians'],
  ['1 Tẹsalóníkà', '1 Thessalonians'],
  ['2 Tẹsalóníkà', '2 Thessalonians'],
  ['1 Tesalonika', '1 Thessalonians'],
  ['2 Tesalonika', '2 Thessalonians'],
  ['1 Tímótì', '1 Timothy'],
  ['2 Tímótì', '2 Timothy'],
  ['1 Timoti', '1 Timothy'],
  ['2 Timoti', '2 Timothy'],
  ['Títù', 'Titus'],
  ['Titu', 'Titus'],
  ['Fílémónì', 'Philemon'],
  ['Filemoni', 'Philemon'],
  ['Hébérù', 'Hebrews'],
  ['Heberu', 'Hebrews'],
  ['Jákọ́bù', 'James'],
  ['Jakọbu', 'James'],
  ['Júùdà', 'Jude'],
  ['Juda', 'Jude'],
  ['Ìfihàn', 'Revelation'],
  ['Ifihan', 'Revelation'],
  ['Jẹ́nẹ́sísì', 'Genesis'],
  ['Gẹnẹsisi', 'Genesis'],
  ['Ékísódù', 'Exodus'],
  ['Eksodu', 'Exodus'],
  ['Léfítíkù', 'Leviticus'],
  ['Lefitiku', 'Leviticus'],
  ['Nọ́ḿbà', 'Numbers'],
  ['Numeri', 'Numbers'],
  ['Diutarónómì', 'Deuteronomy'],
  ['Deuteronomi', 'Deuteronomy'],
  ['Jóṣúà', 'Joshua'],
  ['Joṣua', 'Joshua'],
  ['Àwọn Onídàájọ́', 'Judges'],
  ['Onidajo', 'Judges'],
  ['Rúùtù', 'Ruth'],
  ['Rutu', 'Ruth'],
  ['1 Sámúẹ́lì', '1 Samuel'],
  ['2 Sámúẹ́lì', '2 Samuel'],
  ['1 Samueli', '1 Samuel'],
  ['2 Samueli', '2 Samuel'],
  ['1 Àwọn Ọba', '1 Kings'],
  ['2 Àwọn Ọba', '2 Kings'],
  ['1 Ọba', '1 Kings'],
  ['2 Ọba', '2 Kings'],
  ['1 Kíróníkà', '1 Chronicles'],
  ['2 Kíróníkà', '2 Chronicles'],
  ['Éṣírà', 'Ezra'],
  ['Esira', 'Ezra'],
  ['Nehemáyà', 'Nehemiah'],
  ['Éṣítà', 'Esther'],
  ['Esita', 'Esther'],
  ['Jóòbù', 'Job'],
  ['Jobu', 'Job'],
  ['Sáàmù', 'Psalm'],
  ['Saamu', 'Psalm'],
  ['Òwe', 'Proverbs'],
  ['Owe', 'Proverbs'],
  ['Oníwàásù', 'Ecclesiastes'],
  ['Oniwaasu', 'Ecclesiastes'],
  ['Orin Sólómọ́nì', 'Song of Solomon'],
  ['Aísáyà', 'Isaiah'],
  ['Aisaya', 'Isaiah'],
  ['Jeremáyà', 'Jeremiah'],
  ['Jeremaya', 'Jeremiah'],
  ['Ẹkún Jeremáyà', 'Lamentations'],
  ['Èsíkíẹ́lì', 'Ezekiel'],
  ['Esikieli', 'Ezekiel'],
  ['Dáníẹ́lì', 'Daniel'],
  ['Danieli', 'Daniel'],
  ['Hòṣéà', 'Hosea'],
  ['Hosea', 'Hosea'],
  ['Jóẹ́lì', 'Joel'],
  ['Joeli', 'Joel'],
  ['Ámọ́sì', 'Amos'],
  ['Amosi', 'Amos'],
  ['Ọbadáyà', 'Obadiah'],
  ['Obadaya', 'Obadiah'],
  ['Jónà', 'Jonah'],
  ['Jona', 'Jonah'],
  ['Míkà', 'Micah'],
  ['Mika', 'Micah'],
  ['Náhúmù', 'Nahum'],
  ['Nahumu', 'Nahum'],
  ['Hábákúkù', 'Habakkuk'],
  ['Habakuku', 'Habakkuk'],
  ['Sẹfanáyà', 'Zephaniah'],
  ['Sefanaya', 'Zephaniah'],
  ['Hágáì', 'Haggai'],
  ['Hagai', 'Haggai'],
  ['Sekaráyà', 'Zechariah'],
  ['Sekaraya', 'Zechariah'],
  ['Málákì', 'Malachi'],
  ['Malaki', 'Malachi']
];

// Pairings for translating English Bible book references to Yoruba
const ENGLISH_TO_YORUBA_PAIRS: [string, string][] = [
  ['1 Corinthians', '1 Kọ́ríńtì'],
  ['2 Corinthians', '2 Kọ́ríńtì'],
  ['1 Cor', '1 Kọ́ríńtì'],
  ['2 Cor', '2 Kọ́ríńtì'],
  ['1 Thessalonians', '1 Tẹsalóníkà'],
  ['2 Thessalonians', '2 Tẹsalóníkà'],
  ['1 Thess', '1 Tẹsalóníkà'],
  ['2 Thess', '2 Tẹsalóníkà'],
  ['1 Timothy', '1 Tímótì'],
  ['2 Timothy', '2 Tímótì'],
  ['1 Tim', '1 Tímótì'],
  ['2 Tim', '2 Tímótì'],
  ['1 Peter', '1 Pétérù'],
  ['2 Peter', '2 Pétérù'],
  ['1 Pet', '1 Pétérù'],
  ['2 Pet', '2 Pétérù'],
  ['1 John', '1 Jòhánù'],
  ['2 John', '2 Jòhánù'],
  ['3 John', '3 Jòhánù'],
  ['1 Samuel', '1 Sámúẹ́lì'],
  ['2 Samuel', '2 Sámúẹ́lì'],
  ['1 Kings', '1 Àwọn Ọba'],
  ['2 Kings', '2 Àwọn Ọba'],
  ['1 Chronicles', '1 Kíróníkà'],
  ['2 Chronicles', '2 Kíróníkà'],
  ['John', 'Jòhánù'],
  ['Luke', 'Lúùkù'],
  ['Matthew', 'Mátíù'],
  ['Mark', 'Máàkù'],
  ['Acts', 'Iṣẹ́ Àpọ́sítélì'],
  ['Romans', 'Róòmù'],
  ['Galatians', 'Gálátíà'],
  ['Ephesians', 'Éfésù'],
  ['Philippians', 'Fílípì'],
  ['Colossians', 'Kólósè'],
  ['Titus', 'Títù'],
  ['Philemon', 'Fílémónì'],
  ['Hebrews', 'Hébérù'],
  ['James', 'Jákọ́bù'],
  ['Jude', 'Júùdà'],
  ['Revelation', 'Ìfihàn'],
  ['Genesis', 'Jẹ́nẹ́sísì'],
  ['Exodus', 'Ékísódù'],
  ['Leviticus', 'Léfítíkù'],
  ['Numbers', 'Nọ́ḿbà'],
  ['Deuteronomy', 'Diutarónómì'],
  ['Joshua', 'Jóṣúà'],
  ['Judges', 'Àwọn Onídàájọ́'],
  ['Ruth', 'Rúùtù'],
  ['Ezra', 'Éṣírà'],
  ['Nehemiah', 'Nehemáyà'],
  ['Esther', 'Éṣítà'],
  ['Job', 'Jóòbù'],
  ['Psalms', 'Sáàmù'],
  ['Psalm', 'Sáàmù'],
  ['Proverbs', 'Òwe'],
  ['Ecclesiastes', 'Oníwàásù'],
  ['Song of Solomon', 'Orin Sólómọ́nì'],
  ['Isaiah', 'Aísáyà'],
  ['Jeremiah', 'Jeremáyà'],
  ['Lamentations', 'Ẹkún Jeremáyà'],
  ['Ezekiel', 'Èsíkíẹ́lì'],
  ['Daniel', 'Dáníẹ́lì'],
  ['Hosea', 'Hòṣéà'],
  ['Joel', 'Jóẹ́lì'],
  ['Amos', 'Ámọ́sì'],
  ['Obadiah', 'Ọbadáyà'],
  ['Jonah', 'Jónà'],
  ['Micah', 'Míkà'],
  ['Nahum', 'Náhúmù'],
  ['Habakkuk', 'Hábákúkù'],
  ['Zephaniah', 'Sẹfanáyà'],
  ['Haggai', 'Hágáì'],
  ['Zechariah', 'Sekaráyà'],
  ['Malachi', 'Málákì']
];

export function toEnglishScripture(text: string): string {
  if (!text) return '';
  if (text.includes('/')) {
    const parts = text.split('/');
    const engPart = parts[parts.length - 1].trim();
    if (engPart) return toEnglishScripture(engPart);
  }
  let result = text;
  for (const [yoruba, english] of YORUBA_TO_ENGLISH_PAIRS) {
    const escaped = yoruba.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(^|[^a-zA-ZÀ-ÿ0-9])' + escaped + '([^a-zA-ZÀ-ÿ0-9]|$)', 'gi');
    result = result.replace(regex, '$1' + english + '$2');
  }
  return result;
}

export function toYorubaScripture(text: string): string {
  if (!text) return '';
  if (text.includes('/')) {
    const parts = text.split('/');
    const yorPart = parts[0].trim();
    if (yorPart) return toYorubaScripture(yorPart);
  }
  let result = text;
  for (const [english, yoruba] of ENGLISH_TO_YORUBA_PAIRS) {
    const escaped = english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(^|[^a-zA-ZÀ-ÿ0-9])' + escaped + '([^a-zA-ZÀ-ÿ0-9]|$)', 'gi');
    result = result.replace(regex, '$1' + yoruba + '$2');
  }
  return result;
}

export function getLessonBiblePassage(lesson: SundaySchoolLesson, language: 'english' | 'yoruba'): string {
  if (language === 'english') {
    if (lesson.biblePassageEnglish) return lesson.biblePassageEnglish;
    return toEnglishScripture(lesson.biblePassage);
  } else {
    if (lesson.biblePassageYoruba) return lesson.biblePassageYoruba;
    return toYorubaScripture(lesson.biblePassage);
  }
}

export function getLessonMemoryReference(lesson: SundaySchoolLesson, language: 'english' | 'yoruba'): string {
  const ref = lesson.goldenText?.referenceEnglish || lesson.memoryVerse.reference || '';
  if (language === 'english') {
    if (lesson.goldenText?.referenceEnglish) return lesson.goldenText.referenceEnglish;
    if (lesson.memoryVerse.referenceEnglish) return lesson.memoryVerse.referenceEnglish;
    return toEnglishScripture(ref);
  } else {
    if (lesson.goldenText?.referenceYoruba) return lesson.goldenText.referenceYoruba;
    if (lesson.memoryVerse.referenceYoruba) return lesson.memoryVerse.referenceYoruba;
    return toYorubaScripture(ref);
  }
}

export function getDevotionalReading(lesson: SundaySchoolLesson, language: 'english' | 'yoruba'): string {
  if (lesson.devotionalReading) {
    if (typeof lesson.devotionalReading === 'object') {
      return language === 'yoruba' ? lesson.devotionalReading.yoruba : lesson.devotionalReading.english;
    }
    return language === 'yoruba' ? toYorubaScripture(lesson.devotionalReading) : toEnglishScripture(lesson.devotionalReading);
  }
  return '';
}

export function getBackgroundScripture(lesson: SundaySchoolLesson, language: 'english' | 'yoruba'): string {
  if (lesson.backgroundScripture) {
    if (typeof lesson.backgroundScripture === 'object') {
      return language === 'yoruba' ? lesson.backgroundScripture.yoruba : lesson.backgroundScripture.english;
    }
    return language === 'yoruba' ? toYorubaScripture(lesson.backgroundScripture) : toEnglishScripture(lesson.backgroundScripture);
  }
  return '';
}

export function getLessonScripture(lesson: SundaySchoolLesson, language: 'english' | 'yoruba'): string {
  if (lesson.lessonScripture) {
    if (typeof lesson.lessonScripture === 'object') {
      return language === 'yoruba' ? lesson.lessonScripture.yoruba : lesson.lessonScripture.english;
    }
    return language === 'yoruba' ? toYorubaScripture(lesson.lessonScripture) : toEnglishScripture(lesson.lessonScripture);
  }
  return getLessonBiblePassage(lesson, language);
}

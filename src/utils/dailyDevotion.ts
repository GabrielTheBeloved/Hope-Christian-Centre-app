import { SundaySchoolLesson } from '../types';

export interface TodayDevotion {
  dayName: string;
  dayNameYoruba: string;
  reference: string;
  theme: string;
  themeYoruba: string;
  verseText: string;
  verseTextYoruba: string;
  lessonId: string;
  lessonTopic: string;
  lessonTopicYoruba: string;
}

// Curated scripture texts for known daily readings to ensure high fidelity
const DAILY_VERSES_MAP: Record<string, { en: string; yo: string }> = {
  // Lesson 1 daily readings
  'James 2:14-26': {
    en: 'What good is it, my brothers and sisters, if someone claims to have faith but has no deeds? Faith by itself, if it is not accompanied by action, is dead.',
    yo: 'Kí ni èrè rẹ̀, ará mi, bí ẹnìkan bá sọ pé òun ní ìgbàgbọ́, tí kò sì ní iṣẹ́? Ìgbàgbọ́ náà ha lè gbà á là bí? Ìgbàgbọ́ nìkan, bí kò bá ní iṣẹ́, ó kú nínú ara rẹ̀.'
  },
  'Romans 12:9-21': {
    en: 'Love must be sincere. Hate what is evil; cling to what is good. Share with the Lord’s people who are in need. Practice hospitality.',
    yo: 'Ẹ jẹ́ kí ìfẹ́ kí ó wà láìṣe àgàbàgebè. Ẹ kórìíra ohun búburú; ẹ fi ara mọ́ ohun rere. Ẹ máa pèsè fún àìní àwọn ènìyàn mímọ́; ẹ máa lépa àlejò ṣíṣe.'
  },
  'Hebrews 13:1-6': {
    en: 'Keep on loving one another as brothers and sisters. Do not forget to show hospitality to strangers, for by so doing some people have shown hospitality to angels without knowing it.',
    yo: 'Ẹ jẹ́ kí ìfẹ́ ará kí ó wà títí. Ẹ má ṣe gbàgbé aájò àlejò: nítorí nípa èyí àwọn mìíràn ti gba àwọn áńgẹ́lì lálejò láìmọ̀.'
  },
  'Acts 16:11-15': {
    en: 'One of those listening was a woman from the city of Thyatira named Lydia, a dealer in purple cloth. She was a worshiper of God. The Lord opened her heart to respond to Paul’s message.',
    yo: 'Obìnrin kan tí a ń pè ní Lídíà, oníṣòwò aṣọ elése-àlùkò láti ìlú Tiatira, ẹni tí ń bọ Ọlọ́run, ó tẹ́tí sílẹ̀: ọkàn ẹni tí Olúwa ṣí láti gbọ́ àwọn ohun tí Pọ́ọ̀lù ń sọ.'
  },
  '1 Peter 4:7-11': {
    en: 'Above all, love each other deeply, because love covers over a multitude of sins. Offer hospitality to one another without grumbling.',
    yo: 'Nígbà gbogbo, ẹ máa ní ìfẹ́ gbígbóná sí ara yín: nítorí ìfẹ́ a máa bo ọ̀pọ̀lọpọ̀ ẹ̀ṣẹ̀ mọ́lẹ̀. Ẹ máa ṣe aájò sí ara yín láìṣe àròyé.'
  },
  'Acts 16:35-40': {
    en: 'After Paul and Silas came out of the prison, they went to Lydia’s house, where they met with the brothers and sisters and encouraged them. Then they left.',
    yo: 'Nígbà tí wọ́n sì ti inú túbú jáde, wọ́n wọ ilé Lídíà lọ: nígbà tí wọ́n sì rí àwọn ará, wọ́n tù wọ́n nínú, wọ́n sì jáde lọ.'
  },
  'Acts 16:15': {
    en: 'When she and the members of her household were baptized, she invited us to her home. "If you consider me a believer in the Lord," she said, "come and stay at my house." And she persuaded us.',
    yo: 'Nígbà tí a sì bamitiisi rẹ̀, àti àwọn ará ilé rẹ̀, ó bẹ̀ wá pé, "Bí ẹ̀yin bá kà mí sí olódodo sí Olúwa, ẹ wọ̀ sí ilé mi, kí ẹ sì wọ̀ níbẹ̀." Ó sì fi agbára rọ̀ wá.'
  },

  // Lesson 2 daily readings
  'Saamu 24:1-6': {
    en: 'Who may ascend the mountain of the Lord? Who may stand in His holy place? The one who has clean hands and a pure heart.',
    yo: 'Ta ni yóò gòkè wá sí orí òkè Olúwa? Tàbí ta ni yóò dúró ní ibi mímọ́ Rẹ̀? Ẹni tí ó ní ọwọ́ mímọ́ àti àyà mímọ́.'
  },
  'Lefitiku 19:1-4': {
    en: 'Speak unto all the congregation of the children of Israel, and say unto them: Ye shall be holy: for I the Lord your God am holy.',
    yo: 'Sọ fún gbogbo ìjọ àwọn ọmọ Ísírẹ́lì, kí o sì sọ fún wọn pé: Ẹ jẹ́ mímọ́: nítorí Èmi Olúwa Ọlọ́run yín jẹ́ mímọ́.'
  },
  'Romu 6:11-23': {
    en: 'In the same way, count yourselves dead to sin but alive to God in Christ Jesus. For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.',
    yo: 'Bẹ́ẹ̀ gẹ́gẹ́ kí ẹ̀yin pẹ̀lú ka ara yín sí kíkú sí ẹ̀ṣẹ̀, ṣùgbọ́n sí alààyè sí Ọlọ́run nínú Kristi Jésù Olúwa wa.'
  },
  '2 Timoti 2:19-22': {
    en: 'Those who cleanse themselves from the latter will be instruments for special purposes, made holy, useful to the Master and prepared to do any good work.',
    yo: 'Bí ẹnìkan bá sì wẹ ara rẹ̀ mọ́ kúrò nínú àwọn nǹkan wọ̀nyí, yóò jẹ́ ohun èlò fún ọlá, tí a sọ di mímọ́, tí ó sì yẹ fún iṣẹ́ Olúwa.'
  },
  'Titu 2:11-14': {
    en: 'For the grace of God has appeared that offers salvation to all people. It teaches us to say "No" to ungodliness and worldly passions.',
    yo: 'Nítorí oore-ọ̀fẹ́ Ọlọ́run tí ń mú ìgbàlà wá ti farahàn fún gbogbo ènìyàn, tí ń kọ́ wa pé, kí a kọ àìwà-bi-Ọlọ́run àti àwọn ìfẹ́kúfẹ̀ẹ́ ayé sílẹ̀.'
  },
  'Ifihan 22:11-17': {
    en: 'Let the one who is holy continue to be holy. Look, I am coming soon! My reward is with me, and I will give to each person according to what they have done.',
    yo: 'Kí ẹni tí ó jẹ́ mímọ́, kí ó túbọ̀ jẹ́ mímọ́ síi. Wò ó, Èmi ń bọ̀ nísinsin yìí; èrè Mi sì ń bẹ pẹ̀lú Mi láti san fún olúkúlùkù gẹ́gẹ́ bí iṣẹ́ rẹ̀ yóò ti rí.'
  },
  '1 Peter 1:15-16': {
    en: 'Just as He who called you is holy, so be holy in all you do; for it is written: "Be holy, because I am holy."',
    yo: 'Ṣùgbọ́n bí Ẹni tí ó pè yín ti jẹ́ mímọ́, bẹ́ẹ̀ ni kí ẹ̀yin pẹ̀lú jẹ́ mímọ́ nínú ìwà yín gbogbo; nítorí a ti kọ ọ́ pé, Ẹ jẹ́ mímọ́, nítorí mímọ́ ni Èmi.'
  }
};

const DAY_NAMES_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_NAMES_YO = ['Ọjọ́ Ìsinmi', 'Ọjọ́ Ajé', 'Ọjọ́ Ìṣẹ́gun', 'Ọjọ́ Rú', 'Ọjọ́ Bọ̀', 'Ọjọ́ Ẹtì', 'Ọjọ́ Àbámẹ́ta'];

/**
 * Given a list of Sunday School lessons and an optional target date,
 * computes the relevant lesson and the daily devotion reading for that day.
 */
export function getDailyDevotion(
  lessons: SundaySchoolLesson[],
  targetDate: Date = new Date()
): { devotion: TodayDevotion; currentLesson: SundaySchoolLesson } {
  const dayIndex = targetDate.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  const dayNameEn = DAY_NAMES_EN[dayIndex];
  const dayNameYo = DAY_NAMES_YO[dayIndex];

  // Pick appropriate lesson based on month and week of month
  let selectedLesson = lessons[0];
  if (lessons && lessons.length > 0) {
    const monthIndex = targetDate.getMonth(); // 8 = September, 9 = October, etc.
    const monthNames = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const targetMonthName = monthNames[monthIndex];
    const dayOfMonth = targetDate.getDate();
    // Approximate Sunday of the month: 1..5
    const approxSunday = Math.min(5, Math.ceil(dayOfMonth / 7));

    const matchedLesson = lessons.find(
      (l) => l.month === targetMonthName && l.sundayOfMonth === approxSunday
    ) || lessons.find((l) => l.month === targetMonthName) || lessons[0];

    if (matchedLesson) {
      selectedLesson = matchedLesson;
    }
  }

  // Sunday: Use Sunday School Lesson Bible Passage and Topic
  if (dayIndex === 0) {
    const devotionalRef = typeof selectedLesson.devotionalReading === 'object'
      ? selectedLesson.devotionalReading.english
      : selectedLesson.devotionalReading;

    const ref = selectedLesson.biblePassage ||
      selectedLesson.biblePassageEnglish ||
      selectedLesson.goldenText?.referenceEnglish ||
      selectedLesson.memoryVerse?.reference ||
      devotionalRef ||
      'Acts 16:11-15, 40';
    
    const textEn = selectedLesson.goldenText?.textEnglish ||
      selectedLesson.memoryVerse?.textEnglish ||
      DAILY_VERSES_MAP[ref]?.en ||
      'When she and the members of her household were baptized, she invited us to her home...';

    const textYo = selectedLesson.goldenText?.textYoruba ||
      selectedLesson.memoryVerse?.textYoruba ||
      DAILY_VERSES_MAP[ref]?.yo ||
      'Nígbà tí a sì bamitiisi rẹ̀, àti àwọn ará ilé rẹ̀, ó bẹ̀ wá pé, Bí ẹ̀yin bá kà mí sí olódodo sí Olúwa...';

    return {
      currentLesson: selectedLesson,
      devotion: {
        dayName: 'Sunday',
        dayNameYoruba: 'Ọjọ́ Ìsinmi',
        reference: ref,
        theme: selectedLesson.topicEnglish,
        themeYoruba: selectedLesson.topicYoruba,
        verseText: textEn,
        verseTextYoruba: textYo,
        lessonId: selectedLesson.id,
        lessonTopic: selectedLesson.topicEnglish,
        lessonTopicYoruba: selectedLesson.topicYoruba
      }
    };
  }

  // Monday – Saturday: find daily reading in lesson
  const dailyReading = selectedLesson.dailyReadings?.find((r) =>
    r.dayEnglish.toLowerCase().includes(dayNameEn.toLowerCase())
  );

  if (dailyReading) {
    const scriptureKey = dailyReading.scripture.trim();
    const curated = DAILY_VERSES_MAP[scriptureKey];

    const verseTextEn = curated?.en ||
      `"${dailyReading.themeEnglish}" — Continue your prayer and meditation in ${dailyReading.scripture}.`;
    const verseTextYo = curated?.yo ||
      `"${dailyReading.themeYoruba}" — Tẹ̀síwájú nínú àdúrà àti àṣàrò nínú ${dailyReading.scripture}.`;

    return {
      currentLesson: selectedLesson,
      devotion: {
        dayName: dayNameEn,
        dayNameYoruba: dayNameYo,
        reference: dailyReading.scripture,
        theme: dailyReading.themeEnglish,
        themeYoruba: dailyReading.themeYoruba,
        verseText: verseTextEn,
        verseTextYoruba: verseTextYo,
        lessonId: selectedLesson.id,
        lessonTopic: selectedLesson.topicEnglish,
        lessonTopicYoruba: selectedLesson.topicYoruba
      }
    };
  }

  // Fallback if not found
  return {
    currentLesson: selectedLesson,
    devotion: {
      dayName: dayNameEn,
      dayNameYoruba: dayNameYo,
      reference: 'Acts 16:14',
      theme: "Lydia's heart opened to the Gospel",
      themeYoruba: 'Ìgbàgbọ́ àti ìtẹ́wọ́gbà Lídíà',
      verseText: 'The Lord opened her heart to respond to Paul’s message.',
      verseTextYoruba: 'Ọkàn ẹni tí Olúwa ṣí láti gbọ́ àwọn ohun tí Pọ́ọ̀lù ń sọ.',
      lessonId: selectedLesson.id,
      lessonTopic: selectedLesson.topicEnglish,
      lessonTopicYoruba: selectedLesson.topicYoruba
    }
  };
}

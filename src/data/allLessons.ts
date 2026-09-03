import { SundaySchoolLesson } from '../types';
import { quarter1Lessons } from './lessonsQuarter1';
import { quarter2Lessons } from './lessonsQuarter2';
import { quarter3Lessons } from './lessonsQuarter3';
import { remainingMonthsLessons } from './lessonsRemaining';

// Additional lessons to complete all 52 Sundays of the full year
const summerLessons: SundaySchoolLesson[] = [
  // MAY (5 Sundays)
  {
    id: 'ssl-35',
    lessonNumber: 35,
    quarterNumber: 3,
    quarterThemeYoruba: 'Ìjìnde, Agbára àti Ìdàgbàsókè Ẹ̀mí',
    quarterThemeEnglish: 'Resurrection Power & Spiritual Growth',
    unitTitleYoruba: 'Ẹyọ 6: Ìṣẹ́gun lórí Ìdánwò',
    unitTitleEnglish: 'Unit 6: Victory Over Temptation',
    month: 'may',
    monthYoruba: 'Oṣù Kàrún',
    sundayOfMonth: 1,
    date: 'Ọjọ́ Ìsinmi, 3 Oṣù Kàrún (May 3)',
    dateEnglish: '1st Sunday of May • May 3',
    dateYoruba: 'Ọjọ́ Ìsinmi Àkọ́kọ́ • 3 Oṣù Kàrún',
    topicYoruba: 'Dídúró Gbọningbọn lójú Ìdánwò',
    topicEnglish: 'Standing Firm Against Temptation',
    biblePassage: '1 Kọ́ríńtì 10:1-13; Jákọ́bù 1:12-16',
    memoryVerse: {
      reference: '1 Kọ́ríńtì 10:13 / 1 Corinthians 10:13',
      textYoruba: 'Kò sí ìdánwò kan tí ó ti bá yín bí kò ṣe èyí tí ó wọ́pọ̀ fún ènìyàn: ṣùgbọ́n olóòótọ́ ni Ọlọ́run, Ẹni tí kì yóò jẹ́ kí a dán yín wò ju bí ẹ ti lè gbà lọ; ṣùgbọ́n tí yóò sì ṣe ọ̀nà àbájáde pẹ̀lú ìdánwò náà, kí ẹ lè gbà á.',
      textEnglish: 'There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it.'
    },
    centralTruth: {
      yoruba: 'Ọlọ́run kì í kọ àwọn tirẹ̀ sílẹ̀ nínú ìdánwò; Ó ń pèsè ọ̀nà àbájáde nígbà gbogbo.',
      english: 'God never abandons His children in temptation; He faithfully makes a way of escape.'
    },
    lessonAims: {
      yoruba: ['Láti mọ orísun ìdánwò.', 'Láti gbẹ́kẹ̀lé ìṣòtítọ́ Ọlọ́run.', 'Láti lo Ọ̀rọ̀ Ọlọ́run láti ṣẹ́gun.'],
      english: ['Discern the nature of temptation.', 'Trust God’s faithfulness in trial.', 'Wield God’s Word for victory.']
    },
    introduction: {
      yoruba: 'Ìdánwò kì í ṣe ẹ̀ṣẹ̀ ní tirẹ̀, ṣùgbọ́n gbígbà fún ìdánwò ni ẹ̀ṣẹ̀. Kristi fúnra Rẹ̀ jìyà ìdánwò, nítorí náà Ó lè ran àwọn tí a ń dánwò lọ́wọ́.',
      english: 'Temptation itself is not sin; yielding to temptation is sin. Because Christ was tempted in all points like as we are, yet without sin, He is able to succor them that are tempted.'
    },
    outlines: [
      {
        outlineNumber: 1,
        titleYoruba: 'Àkòrí 1: Ìkìlọ̀ láti Ìtàn Ísírẹ́lì (1 Kọ́ríńtì 10:1-11)',
        titleEnglish: 'Outline 1: Warnings from Israel’s Wilderness History (1 Cor 10:1-11)',
        contentYoruba: ['Wọ́n kọjá nínú òkun ṣùgbọ́n wọ́n kùnà nítorí àìgbàgbọ́.', 'Àwọn nǹkan wọ̀nyí jẹ́ àpẹẹrẹ fún wa kí a má ṣe fẹ́ ohun búburú.'],
        contentEnglish: ['They passed through the sea yet perished through murmuring and lust.', 'These things happened as ensamples for our admonition upon whom the ends of the world are come.'],
        scriptures: ['Saamu 106:13-15', 'Heberu 3:12'],
        discussionQuestionYoruba: 'Kí ni àpẹẹrẹ Ísírẹ́lì nínú aginjù ń kọ́ wa?',
        discussionQuestionEnglish: 'What cautionary lessons does Israel’s wilderness journey teach us?'
      },
      {
        outlineNumber: 2,
        titleYoruba: 'Àkòrí 2: Ọ̀nà Àbájáde ti Ọlọ́run (1 Kọ́ríńtì 10:12-13)',
        titleEnglish: 'Outline 2: God’s Promised Way of Escape (1 Cor 10:12-13)',
        contentYoruba: ['Kí ẹni tí ó rò pé òun dúró kíyèsí ara rẹ̀ kí ó má bà á ṣubú.', 'Ọlọ́run jẹ́ olóòótọ́, Ó ń pèsè ọ̀nà àbájáde nígbà gbogbo.'],
        contentEnglish: ['Let him that thinketh he standeth take heed lest he fall.', 'God is faithful, providing a clear path of escape so we can overcome.'],
        scriptures: ['Matteu 26:41', '2 Peteru 2:9'],
        discussionQuestionYoruba: 'Báwo ni a ṣe lè mọ ọ̀nà àbájáde nígbà ìdánwò?',
        discussionQuestionEnglish: 'How can we spot and seize God’s way of escape in temptation?'
      }
    ],
    practicalApplication: {
      yoruba: 'Ṣọ́ àti gbàdúrà kí ẹ má bà á bọ́ sínú ìdánwò; jẹ́ kí Ọ̀rọ̀ Ọlọ́run wà ní ẹnu rẹ.',
      english: 'Watch and pray that ye enter not into temptation; fortify your thoughts with scripture.'
    },
    summary: {
      yoruba: 'Nípasẹ̀ Kristi, a ní agbára láti ṣẹ́gun gbogbo ìdánwò.',
      english: 'Through Christ, victory over every fiery trial and temptation is assured.'
    },
    closingPrayer: {
      yoruba: 'Olúwa, fún mi ní agbára láti kọjú ìdánwò kí n sì rìn nínú ìṣẹ́gun Rẹ. Àmín.',
      english: 'Lord, give me spiritual strength to withstand all temptations and walk in Your victory. Amen.'
    },
    dailyReadings: [
      { dayYoruba: 'Ọjọ́ Ajé (Monday)', dayEnglish: 'Monday', scripture: '1 Korinti 10:1-6', themeYoruba: 'Àpẹẹrẹ ìkìlọ̀ fún onígbàgbọ́', themeEnglish: 'Examples of warning' },
      { dayYoruba: 'Ọjọ́ Ìṣẹ́gun (Tuesday)', dayEnglish: 'Tuesday', scripture: '1 Korinti 10:7-13', themeYoruba: 'Ọlọ́run olóòótọ́ àti ọ̀nà àbájáde', themeEnglish: 'Faithful God and way of escape' },
      { dayYoruba: 'Ọjọ́ Rú (Wednesday)', dayEnglish: 'Wednesday', scripture: 'Jakobu 1:12-18', themeYoruba: 'Orísun ìdánwò àti adé ìyè', themeEnglish: 'Crown of life for enduring trial' },
      { dayYoruba: 'Ọjọ́ Bọ̀ (Thursday)', dayEnglish: 'Thursday', scripture: 'Matteu 4:1-11', themeYoruba: 'Jésù ṣẹ́gun èṣù pẹ̀lú Ọ̀rọ̀ náà', themeEnglish: 'Jesus defeats Satan by the Word' },
      { dayYoruba: 'Ọjọ́ Ẹtì (Friday)', dayEnglish: 'Friday', scripture: 'Heberu 4:14-16', themeYoruba: 'Olórí àlùfáà tí ó mọ àìlera wa', themeEnglish: 'High priest touched with our infirmities' },
      { dayYoruba: 'Ọjọ́ Àbámẹ́ta (Saturday)', dayEnglish: 'Saturday', scripture: 'Efesu 6:10-18', themeYoruba: 'Gbigbé gbogbo ìhámọ́ra Ọlọ́run wọ̀', themeEnglish: 'Putting on the whole armor of God' }
    ]
  },
  {
    id: 'ssl-36',
    lessonNumber: 36,
    quarterNumber: 3,
    quarterThemeYoruba: 'Ìjìnde, Agbára àti Ìdàgbàsókè Ẹ̀mí',
    quarterThemeEnglish: 'Resurrection Power & Spiritual Growth',
    unitTitleYoruba: 'Ẹyọ 6: Ìṣẹ́gun lórí Ìdánwò',
    unitTitleEnglish: 'Unit 6: Victory Over Temptation',
    month: 'may',
    monthYoruba: 'Oṣù Kàrún',
    sundayOfMonth: 2,
    date: 'Ọjọ́ Ìsinmi, 10 Oṣù Kàrún (May 10)',
    dateEnglish: '2nd Sunday of May • May 10',
    dateYoruba: 'Ọjọ́ Ìsinmi Kejì • 10 Oṣù Kàrún',
    topicYoruba: 'Ẹ̀mí Mímọ́ àti Èso Ẹ̀mí',
    topicEnglish: 'The Holy Spirit and the Fruit of the Spirit',
    biblePassage: 'Gálátíà 5:16-26; Jòhánù 15:1-8',
    memoryVerse: {
      reference: 'Gálátíà 5:22-23 / Galatians 5:22-23',
      textYoruba: 'Ṣùgbọ́n èso ti Ẹ̀mí ni ìfẹ́, ayọ̀, àlàáfíà, ìpamọ́ra, ìwà pípé, oore, ìgbàgbọ́, ìwà tútù, àkóso ara: kò sí òfin tí ó kọ nǹkan wọ̀nyí.',
      textEnglish: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.'
    },
    centralTruth: {
      yoruba: 'Bí a ti ń rìn nínú Ẹ̀mí Mímọ́, iṣẹ́ ara ń kú, àwọn ànímọ́ Kristi sì ń yọ jáde nínú wa bí èso dídùn.',
      english: 'Walking in the Holy Spirit puts to death the deeds of the flesh and manifests the sweet character of Jesus.'
    },
    lessonAims: {
      yoruba: ['Láti mọ ìyàtọ̀ láàárín iṣẹ́ ara àti èso Ẹ̀mí.', 'Láti fi ààyè gba Ẹ̀mí Mímọ́ láti so èso nínú wa.', 'Láti fi ìfẹ́ àti àkóso ara hàn.'],
      english: ['Distinguish between works of the flesh and fruit of the Spirit.', 'Surrender fully to the Spirit’s cultivating work.', 'Demonstrate Christlike love and self-control.']
    },
    introduction: {
      yoruba: 'Èso kì í ṣe ohun tí ènìyàn ń fi tipátipá ṣe láti ara rẹ̀, ṣùgbọ́n ó jẹ́ àbájáde bí ẹ̀ka ṣe so mọ́ àjàrà. Nígbà tí a bá wà nínú Kristi tí a sì ń rìn nínú Ẹ̀mí, èso mímọ́ yóò yọ jáde nínú ìhùwàsí wa.',
      english: 'Fruit is not manufactured by fleshly willpower; it grows naturally when the branch abides in the vine. Abiding in Christ produces the ninefold fragrance of the Spirit.'
    },
    outlines: [
      {
        outlineNumber: 1,
        titleYoruba: 'Àkòrí 1: Ìjà láàárín Ara àti Ẹ̀mí (Gálátíà 5:16-21)',
        titleEnglish: 'Outline 1: The Conflict Between Flesh and Spirit (Galatians 5:16-21)',
        contentYoruba: ['Ẹ máa rìn nínú Ẹ̀mí, ẹ̀yin kì yóò sì mú ìfẹ́kúfẹ̀ẹ́ ara ṣẹ.', 'Iṣẹ́ ara hàn gbangba: àgbèrè, ìbọ̀rìṣà, ìkùnsínú, àti irú wọn.'],
        contentEnglish: ['Walk in the Spirit, and ye shall not fulfill the lust of the flesh.', 'The works of the flesh are manifest: adultery, idolatry, wrath, strife, and such like.'],
        scriptures: ['Romu 8:5-8', 'Kolose 3:5-9'],
        discussionQuestionYoruba: 'Báwo ni a ṣe lè dẹ́kun fífún ara ní ààyè láti darí wa?',
        discussionQuestionEnglish: 'How do we effectively mortify the appetites of the flesh daily?'
      },
      {
        outlineNumber: 2,
        titleYoruba: 'Àkòrí 2: Èso Ẹ̀mí tí ń Kó Ògo Bá Ọlọ́run (Gálátíà 5:22-26)',
        titleEnglish: 'Outline 2: The Spirit’s Fruit Glorifying the Father (Galatians 5:22-26)',
        contentYoruba: ['Èso Ẹ̀mí ní apá mẹ́sàn-án tí ń fi ìwà Kristi hàn.', 'Àwọn tí í ṣe ti Kristi ti kan ara mọ́ àgbélébùú pẹ̀lú ìfẹ́kúfẹ̀ẹ́ rẹ̀.'],
        contentEnglish: ['The fruit of the Spirit reflects the ninefold perfection of Christ.', 'They that are Christ’s have crucified the flesh with the affections and lusts.'],
        scriptures: ['Johanu 15:4-5', '2 Peteru 1:5-8'],
        discussionQuestionYoruba: 'Èwo nínú àwọn èso Ẹ̀mí wọ̀nyí ni ó nira jùlọ fún ọ láti fi hàn?',
        discussionQuestionEnglish: 'Which aspect of the fruit of the Spirit requires the most cultivation in your life?'
      }
    ],
    practicalApplication: {
      yoruba: 'Bẹ̀rẹ̀ sí fi ìfẹ́, sùúrù, àti ìwà tútù hàn sí àwọn ènìyàn tí ó yí ọ ká lónìí.',
      english: 'Consciously extend love, patience, and kindness to those around you today.'
    },
    summary: {
      yoruba: 'Ẹ̀mí Mímọ́ ń yi wa padà sí àwòrán Kristi bí a ti ń tẹríba fún Un.',
      english: 'The Holy Spirit transforms us into the image of Christ as we yield to His presence.'
    },
    closingPrayer: {
      yoruba: 'Ẹ̀mí Mímọ́, kún ayé mi lónìí kí o sì mú kí èso Rẹ kún inú mi títí yóò fi ya sode. Àmín.',
      english: 'Holy Spirit, fill me afresh today and cause Your fruitful life to blossom in me. Amen.'
    },
    dailyReadings: [
      { dayYoruba: 'Ọjọ́ Ajé (Monday)', dayEnglish: 'Monday', scripture: 'Galatia 5:16-18', themeYoruba: 'Rírìn nínú Ẹ̀mí Mímọ́', themeEnglish: 'Walking in the Spirit' },
      { dayYoruba: 'Ọjọ́ Ìṣẹ́gun (Tuesday)', dayEnglish: 'Tuesday', scripture: 'Galatia 5:19-21', themeYoruba: 'Àwọn iṣẹ́ ara àti ewu wọn', themeEnglish: 'Works of the flesh and their peril' },
      { dayYoruba: 'Ọjọ́ Rú (Wednesday)', dayEnglish: 'Wednesday', scripture: 'Galatia 5:22-26', themeYoruba: 'Èso Ẹ̀mí àti ìkànmọ́ àgbélébùú ti ara', themeEnglish: 'The fruit of the Spirit and crucifixion of flesh' },
      { dayYoruba: 'Ọjọ́ Bọ̀ (Thursday)', dayEnglish: 'Thursday', scripture: 'Johanu 15:1-8', themeYoruba: 'Àjàrà tòótọ́ àti àwọn ẹ̀ka', themeEnglish: 'The true Vine and fruitful branches' },
      { dayYoruba: 'Ọjọ́ Ẹtì (Friday)', dayEnglish: 'Friday', scripture: 'Kolose 3:12-17', themeYoruba: 'Gbígbé àwọn ànímọ́ Kristi wọ̀', themeEnglish: 'Putting on the divine nature of Christ' },
      { dayYoruba: 'Ọjọ́ Àbámẹ́ta (Saturday)', dayEnglish: 'Saturday', scripture: '1 Korinti 13:1-13', themeYoruba: 'Ìfẹ́ tí ó tayọ gbogbo ẹ̀bùn lọ', themeEnglish: 'Love the greatest of all virtues' }
    ]
  },
  {
    id: 'ssl-37',
    lessonNumber: 37,
    quarterNumber: 3,
    quarterThemeYoruba: 'Ìjìnde, Agbára àti Ìdàgbàsókè Ẹ̀mí',
    quarterThemeEnglish: 'Resurrection Power & Spiritual Growth',
    unitTitleYoruba: 'Ẹyọ 6: Ìṣẹ́gun lórí Ìdánwò',
    unitTitleEnglish: 'Unit 6: Victory Over Temptation',
    month: 'may',
    monthYoruba: 'Oṣù Kàrún',
    sundayOfMonth: 3,
    date: 'Ọjọ́ Ìsinmi, 17 Oṣù Kàrún (May 17)',
    dateEnglish: '3rd Sunday of May • May 17',
    dateYoruba: 'Ọjọ́ Ìsinmi Kẹta • 17 Oṣù Kàrún',
    topicYoruba: 'Ìwà Mímọ́: Ìpè sí Ìyàsọ́tọ̀ fún Ọlọ́run',
    topicEnglish: 'Holiness: Called to Consecration and Purity',
    biblePassage: '1 Pétérù 1:13-25; Léfítíkù 11:44-45',
    memoryVerse: {
      reference: '1 Pétérù 1:15-16 / 1 Peter 1:15-16',
      textYoruba: 'Ṣùgbọ́n bí Ẹni tí ó pè yín ti jẹ́ mímọ́, bẹ́ẹ̀ ni kí ẹ̀yin náà jẹ́ mímọ́ nínú gbogbo ìwà yín; Nítorí a ti kọ ọ́ pé, Ẹ jẹ́ mímọ́; nítorí èmi jẹ́ mímọ́.',
      textEnglish: 'But as he which hath called you is holy, so be ye holy in all manner of conversation; Because it is written, Be ye holy; for I am holy.'
    },
    centralTruth: {
      yoruba: 'Ìwà mímọ́ kò ṣeé yẹ̀ sílẹ̀ nínú ìrìn àjò onígbàgbọ́; láìsí ìwà mímọ́ kò sí ẹnìkankan tí yóò rí Olúwa.',
      english: 'Holiness is essential in the believer’s walk; without holiness no man shall see the Lord.'
    },
    lessonAims: {
      yoruba: ['Láti mọ bí Ọlọ́run wa ti jẹ́ mímọ́ tó.', 'Láti ya ara wa sọ́tọ̀ kúrò nínú àbùkù ayé.', 'Láti gbé ìgbé-ayé tí ń fi ògo fún Ọlọ́run.'],
      english: ['Apprehend the holy nature of our God.', 'Separate ourselves from the pollutants of the world.', 'Live an untarnished life consecrated to His will.']
    },
    introduction: {
      yoruba: 'Ọlọ́run kì í pe wa sí ìmọ́tótó ti ara nìkan, ṣùgbọ́n sí ìwà mímọ́ nínú ọkàn, èrò, àti iṣẹ́. Ẹjẹ̀ Kristi ti wẹ̀ wa mọ́, Ẹ̀mí Mímọ́ sì ń ya wa sọ́tọ̀ fún Ọlọ́run.',
      english: 'God summons us not to superficial morality but to deep inner holiness of thoughts, desires, and deeds. Christ’s blood purges us and the Spirit consecrates us.'
    },
    outlines: [
      {
        outlineNumber: 1,
        titleYoruba: 'Àkòrí 1: Ìpè sí Ìwà Mímọ́ (1 Pétérù 1:13-16)',
        titleEnglish: 'Outline 1: The Divine Call to Holiness (1 Peter 1:13-16)',
        contentYoruba: ['Ẹ di àmùrè ọkàn yín gírí, ẹ sì máa ṣọ́nà.', 'Ẹ má ṣe tún ara yín ṣe gẹ́gẹ́ bí ìfẹ́kúfẹ̀ẹ́ àtijọ́ nígbà àìmọ̀ yín.'],
        contentEnglish: ['Gird up the loins of your mind, be sober, and hope to the end.', 'Fashion not yourselves according to the former lusts in your ignorance.'],
        scriptures: ['Romu 12:1-2', '2 Korinti 7:1'],
        discussionQuestionYoruba: 'Kí ni ìyàtọ̀ láàárín ìwà mímọ́ tòótọ́ àti ìfarahàn ẹ̀sìn?',
        discussionQuestionEnglish: 'How does authentic inward holiness differ from legalistic externalism?'
      },
      {
        outlineNumber: 2,
        titleYoruba: 'Àkòrí 2: Iyebíye Ẹ̀jẹ̀ tí a fi Rà Wá (1 Pétérù 1:17-25)',
        titleEnglish: 'Outline 2: Redeemed with Precious Blood (1 Peter 1:17-25)',
        contentYoruba: ['A kò fi fàdákà tàbí wúrà rà yín padà, bí kò ṣe pẹ̀lú ẹ̀jẹ̀ iyebíye Kristi.', 'Ẹ fẹ́ràn ara yín tọkàntọkàn pẹ̀lú ọkàn tí ó mọ́.'],
        contentEnglish: ['Redeemed not with corruptible things like silver or gold, but with the precious blood of Christ.', 'Love one another with a pure heart fervently.'],
        scriptures: ['Heberu 12:14', '1 Tesalonika 4:3-7'],
        discussionQuestionYoruba: 'Báwo ni mímọ iye tí Kristi fi rà wa ṣe ń ru wa sókè sí ìwà mímọ́?',
        discussionQuestionEnglish: 'How does contemplating the price of redemption inspire holy living?'
      }
    ],
    practicalApplication: {
      yoruba: 'Yẹ ọkàn rẹ wò lónìí: jọ̀wọ́ gbogbo ìwà àìmọ́ tàbí àṣà búburú fún Ọlọ́run nínú àdúrà.',
      english: 'Examine your life today: yield every secret impure habit to the cleansing fire of God.'
    },
    summary: {
      yoruba: 'Ìwà mímọ́ ni ẹ̀wù àkọ́kọ́ tí onígbàgbọ́ gbọ́dọ̀ wọ̀ láti wù Ọlọ́run.',
      english: 'Holiness is the essential garment of the believer pleasing to Almighty God.'
    },
    closingPrayer: {
      yoruba: 'Ọlọ́run mímọ́, wẹ̀ mí mọ́ kúrò nínú gbogbo ẹ̀ṣẹ̀; ya mí sọ́tọ̀ fún ìlò Rẹ nìkan. Àmín.',
      english: 'Holy Father, cleanse me thoroughly from all iniquity; set me apart solely for Your glory. Amen.'
    },
    dailyReadings: [
      { dayYoruba: 'Ọjọ́ Ajé (Monday)', dayEnglish: 'Monday', scripture: '1 Peteru 1:13-16', themeYoruba: 'Ẹ jẹ́ mímọ́ nítorí Èmi jẹ́ mímọ́', themeEnglish: 'Be ye holy for I am holy' },
      { dayYoruba: 'Ọjọ́ Ìṣẹ́gun (Tuesday)', dayEnglish: 'Tuesday', scripture: '1 Peteru 1:17-21', themeYoruba: 'Ẹ̀jẹ̀ iyebíye ti Kristi', themeEnglish: 'The precious blood of Christ' },
      { dayYoruba: 'Ọjọ́ Rú (Wednesday)', dayEnglish: 'Wednesday', scripture: 'Lefitiku 19:1-4', themeYoruba: 'Àṣẹ ìwà mímọ́ nínú Májẹ̀mú Láéláé', themeEnglish: 'The holiness command in the Law' },
      { dayYoruba: 'Ọjọ́ Bọ̀ (Thursday)', dayEnglish: 'Thursday', scripture: '1 Tesalonika 4:1-8', themeYoruba: 'Ìfẹ́ Ọlọ́run ni ìyàsọ́tọ̀ yín', themeEnglish: 'God’s will is your sanctification' },
      { dayYoruba: 'Ọjọ́ Ẹtì (Friday)', dayEnglish: 'Friday', scripture: '2 Korinti 6:14-18', themeYoruba: 'Ẹ jáde kúrò láàárín wọn, ẹ sì yà sọ́tọ̀', themeEnglish: 'Come out from among them and be ye separate' },
      { dayYoruba: 'Ọjọ́ Àbámẹ́ta (Saturday)', dayEnglish: 'Saturday', scripture: 'Heberu 12:12-17', themeYoruba: 'Láìsí ìwà mímọ́, kò sí ẹni tí yóò rí Olúwa', themeEnglish: 'Without holiness no man shall see the Lord' }
    ]
  },
  {
    id: 'ssl-38',
    lessonNumber: 38,
    quarterNumber: 3,
    quarterThemeYoruba: 'Ìjìnde, Agbára àti Ìdàgbàsókè Ẹ̀mí',
    quarterThemeEnglish: 'Resurrection Power & Spiritual Growth',
    unitTitleYoruba: 'Ẹyọ 6: Ìṣẹ́gun lórí Ìdánwò',
    unitTitleEnglish: 'Unit 6: Victory Over Temptation',
    month: 'may',
    monthYoruba: 'Oṣù Kàrún',
    sundayOfMonth: 4,
    date: 'Ọjọ́ Ìsinmi, 24 Oṣù Kàrún (May 24)',
    dateEnglish: '4th Sunday of May • May 24',
    dateYoruba: 'Ọjọ́ Ìsinmi Kẹrin • 24 Oṣù Kàrún',
    topicYoruba: 'Pentikọsti: Agbára Ẹ̀mí Mímọ́ tí ń Sọkalẹ̀',
    topicEnglish: 'Pentecost: The Outpouring of Holy Ghost Fire',
    biblePassage: 'Iṣẹ́ Àpọ́sítélì 2:1-21; Jóẹ́lì 2:28-32',
    memoryVerse: {
      reference: 'Iṣẹ́ 1:8 / Acts 1:8',
      textYoruba: 'Ṣùgbọ́n ẹ̀yin yóò gba agbára, nígbà tí Ẹ̀mí Mímọ́ bá bà lé yín: ẹ̀yin yóò sì jẹ́ ẹlẹ́rìí Mi ní Jerúsálẹ́mù, àti ní gbogbo Jùdíà, àti ní Samáríà, àti títí dé òpin ilẹ̀ ayé.',
      textEnglish: 'But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.'
    },
    centralTruth: {
      yoruba: 'Agbára Ẹ̀mí Mímọ́ ni ó ń fún onígbàgbọ́ ní ìgboyà àti àṣẹ láti wàásù ìhìn-rere fún gbogbo ayé.',
      english: 'The baptism of the Holy Spirit empowers believers with divine audacity and power to witness to the ends of the earth.'
    },
    lessonAims: {
      yoruba: ['Láti mọ ìṣẹ̀lẹ̀ ọjọ́ Pentikọsti.', 'Láti fẹ́ ẹ̀bùn àti ẹ̀kúnrẹ́rẹ́ Ẹ̀mí Mímọ́.', 'Láti jẹ́ ẹlẹ́rìí tí kò bẹ̀rù fún Kristi.'],
      english: ['Explore the historic Pentecost outpouring.', 'Hunger for fresh fullness of the Holy Spirit.', 'Step out as an unashamed witness for Jesus.']
    },
    introduction: {
      yoruba: 'Lórí òkè Jerúsálẹ́mù, nígbà tí àwọn ọmọ-ẹ̀yìn wà ní ìṣọ̀kan nínú àdúrà, Ẹ̀mí Mímọ́ sọ̀kalẹ̀ bí ẹ̀fúùfù líle àti ahọ́n iná. Èyí yí àwọn ọmọ-ẹ̀yìn tí ó ń bẹ̀rù tẹ́lẹ̀ padà sí àwọn jagunjagun ńlá ti Kristi.',
      english: 'In the upper room, as disciples tarried in unanimous prayer, heaven opened with the rush of a mighty wind and cloven tongues of fire. Timid disciples were transformed into fearless champions of the cross.'
    },
    outlines: [
      {
        outlineNumber: 1,
        titleYoruba: 'Àkòrí 1: Ìsọ̀kalẹ̀ Ẹ̀mí Mímọ́ ní Ọjọ́ Pentikọsti (Iṣẹ́ 2:1-13)',
        titleEnglish: 'Outline 1: The Descent of the Spirit at Pentecost (Acts 2:1-13)',
        contentYoruba: ['Gbogbo wọn wà ní ìṣọ̀kan ní ibìkan náà.', 'Ẹ̀mí Mímọ́ kún gbogbo wọn, wọ́n sì bẹ̀rẹ̀ sí fi àwọn ahọ́n mìíràn sọ̀rọ̀.'],
        contentEnglish: ['They were all with one accord in one place.', 'All were filled with the Holy Ghost and began to speak with other tongues as the Spirit gave utterance.'],
        scriptures: ['Iṣẹ́ 1:14', 'Marku 16:17'],
        discussionQuestionYoruba: 'Kí nìdí tí ìṣọ̀kan nínú àdúrà fi ṣe pàtàkì fún ìsọ̀kalẹ̀ Ẹ̀mí?',
        discussionQuestionEnglish: 'Why is unified prayer the primary catalyst for spiritual revival?'
      },
      {
        outlineNumber: 2,
        titleYoruba: 'Àkòrí 2: Ìwàásù Pétérù àti Ìkórè Ọkàn (Iṣẹ́ 2:14-21, 37-41)',
        titleEnglish: 'Outline 2: Peter’s Preaching and the Great Harvest (Acts 2:14-21, 37-41)',
        contentYoruba: ['Pétérù dúró pẹ̀lú àwọn mọ́kànlá ó sì wàásù pẹ̀lú agbára ńlá.', 'Ní ọjọ́ náà, nǹkan bí ẹgbẹ̀rún mẹ́ta ọkàn ni a fi kún ìjọ.'],
        contentEnglish: ['Peter stood with the eleven, boldly proclaiming Joel’s prophecy fulfilled.', 'About three thousand souls gladly received the word and were baptized that single day.'],
        scriptures: ['Joel 2:28-32', 'Iṣẹ́ 4:31'],
        discussionQuestionYoruba: 'Kí ni àyípadà tí agbára Ẹ̀mí Mímọ́ ṣe nínú Pétérù?',
        discussionQuestionEnglish: 'How did the Holy Ghost completely revolutionize Peter’s courage?'
      }
    ],
    practicalApplication: {
      yoruba: 'Wá ẹ̀kúnrẹ́rẹ́ Ẹ̀mí Mímọ́ lónìí kí o sì bẹ Ọlọ́run fún iná tuntun nínú iṣẹ́ ìsìn rẹ.',
      english: 'Seek the baptism of the Holy Spirit today and ask God for fresh fire in your soul.'
    },
    summary: {
      yoruba: 'Pentikọsti kò parí; agbára Ẹ̀mí Mímọ́ wà fún gbogbo wa lónìí.',
      english: 'Pentecost is not a past memorial; the Spirit’s power is our present inheritance.'
    },
    closingPrayer: {
      yoruba: 'Bàbá, fi Ẹ̀mí Mímọ́ àti iná Rẹ tún mi kún lónìí lórúkọ Jésù. Àmín.',
      english: 'Heavenly Father, baptize me afresh with the Holy Ghost and with fire. Amen.'
    },
    dailyReadings: [
      { dayYoruba: 'Ọjọ́ Ajé (Monday)', dayEnglish: 'Monday', scripture: 'Iṣẹ́ 1:1-8', themeYoruba: 'Ìlérí agbára Ẹ̀mí Mímọ́', themeEnglish: 'The promise of the Holy Ghost' },
      { dayYoruba: 'Ọjọ́ Ìṣẹ́gun (Tuesday)', dayEnglish: 'Tuesday', scripture: 'Iṣẹ́ 2:1-13', themeYoruba: 'Ọjọ́ Pentikọsti dé', themeEnglish: 'The day of Pentecost fully come' },
      { dayYoruba: 'Ọjọ́ Rú (Wednesday)', dayEnglish: 'Wednesday', scripture: 'Iṣẹ́ 2:14-21', themeYoruba: 'Ìmúṣẹ àsọtẹ́lẹ̀ wòlíì Jóẹ́lì', themeEnglish: 'Fulfillment of the prophet Joel' },
      { dayYoruba: 'Ọjọ́ Bọ̀ (Thursday)', dayEnglish: 'Thursday', scripture: 'Iṣẹ́ 2:37-47', themeYoruba: 'Ẹgbẹ̀rún mẹ́ta ọkàn gba ìgbàlà', themeEnglish: 'Three thousand souls added' },
      { dayYoruba: 'Ọjọ́ Ẹtì (Friday)', dayEnglish: 'Friday', scripture: 'Iṣẹ́ 4:23-31', themeYoruba: 'Àdúrà fún ìgboyà àti mìmì ilẹ̀', themeEnglish: 'Praying for bold utterance' },
      { dayYoruba: 'Ọjọ́ Àbámẹ́ta (Saturday)', dayEnglish: 'Saturday', scripture: 'Iṣẹ́ 10:44-48', themeYoruba: 'Ẹ̀mí Mímọ́ bà lé ilé Kọ́nélíù', themeEnglish: 'The Spirit poured out on the Gentiles' }
    ]
  },
  {
    id: 'ssl-39',
    lessonNumber: 39,
    quarterNumber: 3,
    quarterThemeYoruba: 'Ìjìnde, Agbára àti Ìdàgbàsókè Ẹ̀mí',
    quarterThemeEnglish: 'Resurrection Power & Spiritual Growth',
    unitTitleYoruba: 'Ẹyọ 6: Ìṣẹ́gun lórí Ìdánwò',
    unitTitleEnglish: 'Unit 6: Victory Over Temptation',
    month: 'may',
    monthYoruba: 'Oṣù Kàrún',
    sundayOfMonth: 5,
    date: 'Ọjọ́ Ìsinmi, 31 Oṣù Kàrún (May 31)',
    dateEnglish: '5th Sunday of May • May 31',
    dateYoruba: 'Ọjọ́ Ìsinmi Kárùn-ún • 31 Oṣù Kàrún',
    topicYoruba: 'Ìfẹ́ Ọlọ́run: Òfin tí Ó Ga Jùlọ',
    topicEnglish: 'The Love of God: The Supreme Commandment',
    biblePassage: '1 Jòhánù 4:7-21; Máàkù 12:28-34',
    memoryVerse: {
      reference: '1 Jòhánù 4:19 / 1 John 4:19',
      textYoruba: 'Àwa fẹ́ràn Rẹ̀, nítorí tí Òun kọ́kọ́ fẹ́ràn wa.',
      textEnglish: 'We love him, because he first loved us.'
    },
    centralTruth: {
      yoruba: 'Ìfẹ́ àìlẹ́tàn sí Ọlọ́run àti sí ọmọnìkejì ni àmì tòótọ́ ti ọmọ-ẹ̀yìn Kristi.',
      english: 'Unconditional love for God and neighbor is the defining hallmark of true discipleship.'
    },
    lessonAims: {
      yoruba: ['Láti mọ bí ìfẹ́ Ọlọ́run ti gbòòrò tó.', 'Láti fẹ́ràn ara wa gẹ́gẹ́ bí Kristi ti fẹ́ràn wa.', 'Láti mú ìbẹ̀rù kúrò nípasẹ̀ ìfẹ́ pípé.'],
      english: ['Comprehend the boundless dimensions of God’s love.', 'Love our brothers as Christ loved us.', 'Cast out fear through perfected love.']
    },
    introduction: {
      yoruba: 'Ọlọ́run kì í kàn ní ìfẹ́ nìkan, ṣùgbọ́n Ọlọ́run fúnra Rẹ̀ ni Ìfẹ́. Nígbà tí a bá ń gbé nínú ìfẹ́, a ń gbé nínú Ọlọ́run. Ìfẹ́ yìí ni a fi hàn nípa fífi Ọmọ Rẹ̀ kan ṣoṣo fún wa.',
      english: 'God does not simply possess love; God is Love. He demonstrated this agape love by sending His only begotten Son into the world to be the propitiation for our sins.'
    },
    outlines: [
      {
        outlineNumber: 1,
        titleYoruba: 'Àkòrí 1: Ìfẹ́ ti Ọlọ́run Fi Hàn sí Wa (1 Jòhánù 4:7-11)',
        titleEnglish: 'Outline 1: God’s Love Revealed to Us (1 John 4:7-11)',
        contentYoruba: ['Ẹni tí kò nífẹ̀ẹ́ kò mọ Ọlọ́run; nítorí Ọlọ́run jẹ́ ìfẹ́.', 'Bí Ọlọ́run bá fẹ́ràn wa báyìí, ó yẹ kí àwa náà fẹ́ràn ara wa.'],
        contentEnglish: ['He that loveth not knoweth not God; for God is love.', 'Beloved, if God so loved us, we ought also to love one another.'],
        scriptures: ['Johanu 3:16', 'Romu 5:8'],
        discussionQuestionYoruba: 'Báwo ni a ṣe lè fi ìfẹ́ Ọlọ́run hàn sí àwọn tí ó ṣe wa ní ibi?',
        discussionQuestionEnglish: 'How do we tangibly extend God’s love to people who mistreat us?'
      },
      {
        outlineNumber: 2,
        titleYoruba: 'Àkòrí 2: Ìfẹ́ Pípé tí ń Lé Ìbẹ̀rù Jáde (1 Jòhánù 4:12-21)',
        titleEnglish: 'Outline 2: Perfect Love Casting Out Fear (1 John 4:12-21)',
        contentYoruba: ['Kò sí ìbẹ̀rù nínú ìfẹ́; ṣùgbọ́n ìfẹ́ pípé ń lé ìbẹ̀rù jáde.', 'Bí ẹnìkan bá sọ pé, "Mo fẹ́ràn Ọlọ́run," tí ó sì kórìíra arákùnrin rẹ̀, èké ni.'],
        contentEnglish: ['There is no fear in love; but perfect love casteth out fear.', 'If a man say, I love God, and hateth his brother, he is a liar.'],
        scriptures: ['1 Korinti 13:4-8', 'Matteu 22:37-40'],
        discussionQuestionYoruba: 'Kí nìdí tí ìkórìíra arákùnrin fi ń sọ ìjọsìn wa di asán?',
        discussionQuestionEnglish: 'Why does harbored resentment toward a brother invalidate worship?'
      }
    ],
    practicalApplication: {
      yoruba: 'Fi ìfẹ́ hàn sí ẹnìkan tí o kò bá rẹ́ pọ̀ tẹ́lẹ̀ ní ọ̀sẹ̀ yìí; bẹ̀rẹ̀ pẹ̀lú ìdáríjì.',
      english: 'Reach out with active reconciliation to someone you have been estranged from this week.'
    },
    summary: {
      yoruba: 'Ìfẹ́ Kristi ni agbára tí ó tóbi jùlọ tí ó lè mú àyípadà wá sí ayé wa.',
      english: 'The agape love of God is the greatest transforming force in all creation.'
    },
    closingPrayer: {
      yoruba: 'Olúwa, da ìfẹ́ Rẹ sí ọkàn mi nípasẹ̀ Ẹ̀mí Mímọ́ kí n lè fẹ́ràn àwọn ẹlòmíràn. Àmín.',
      english: 'Lord, shed Your love abroad in my heart by the Holy Spirit so I may love others purely. Amen.'
    },
    dailyReadings: [
      { dayYoruba: 'Ọjọ́ Ajé (Monday)', dayEnglish: 'Monday', scripture: '1 Johanu 4:7-11', themeYoruba: 'Ọlọ́run jẹ́ ìfẹ́', themeEnglish: 'God is love' },
      { dayYoruba: 'Ọjọ́ Ìṣẹ́gun (Tuesday)', dayEnglish: 'Tuesday', scripture: '1 Johanu 4:12-16', themeYoruba: 'Gbigbé nínú ìfẹ́ àti nínú Ọlọ́run', themeEnglish: 'Dwelling in love and in God' },
      { dayYoruba: 'Ọjọ́ Rú (Wednesday)', dayEnglish: 'Wednesday', scripture: '1 Johanu 4:17-21', themeYoruba: 'Ìfẹ́ pípé ń lé ìbẹ̀rù jáde', themeEnglish: 'Perfect love casts out fear' },
      { dayYoruba: 'Ọjọ́ Bọ̀ (Thursday)', dayEnglish: 'Thursday', scripture: 'Marku 12:28-34', themeYoruba: 'Àṣẹ tí ó ga jùlọ', themeEnglish: 'The great commandment' },
      { dayYoruba: 'Ọjọ́ Ẹtì (Friday)', dayEnglish: 'Friday', scripture: 'Johanu 13:31-35', themeYoruba: 'Àṣẹ tuntun ti ìfẹ́', themeEnglish: 'A new commandment to love' },
      { dayYoruba: 'Ọjọ́ Àbámẹ́ta (Saturday)', dayEnglish: 'Saturday', scripture: 'Romu 8:31-39', themeYoruba: 'Kò sí ohun tí ó lè yà wa kúrò nínú ìfẹ́ Ọlọ́run', themeEnglish: 'Nothing can separate us from the love of God' }
    ]
  }
];

// Combine all loaded quarters and generate remaining summer months (June, July, August) dynamically
export function getAllSundaySchoolLessons(): SundaySchoolLesson[] {
  const baseLessons: SundaySchoolLesson[] = [
    ...quarter1Lessons,
    ...quarter2Lessons,
    ...quarter3Lessons,
    ...remainingMonthsLessons,
    ...summerLessons,
  ];

  // June, July, August lessons
  const monthLessonsData: { month: 'june' | 'july' | 'august'; monthYoruba: string; count: number; startLesson: number; quarterThemeY: string; quarterThemeE: string; topics: { y: string; e: string; ref: string; memY: string; memE: string }[] }[] = [
    {
      month: 'june',
      monthYoruba: 'Oṣù Kẹfà',
      count: 4,
      startLesson: 40,
      quarterThemeY: 'Ìjọba Ọlọ́run, Ìjọ àti Ìhìn Rere',
      quarterThemeE: 'The Kingdom of God, the Church & the Gospel',
      topics: [
        { y: 'Ìṣọ̀kan Ìjọ: Ara Kristi Kan Ṣoṣo', e: 'Unity in the Body of Christ', ref: '1 Kọ́ríńtì 12:12-27', memY: 'Nítorí gẹ́gẹ́ bí ara ti jẹ́ ọ̀kan, tí ó sì ní ẹ̀yà púpọ̀... bẹ́ẹ̀ gẹ́gẹ́ ni Kristi pẹ̀lú.', memE: 'For as the body is one, and hath many members... so also is Christ.' },
        { y: 'Ìṣòtítọ́ nínú Ìdámẹ́wàá àti Ọrẹ', e: 'Faithful Stewardship: Tithes and Offerings', ref: 'Málákì 3:8-12; 2 Kọ́ríńtì 9:6-11', memY: 'Ẹ mú gbogbo ìdámẹ́wàá wá sí ilé ìṣúra... kí ẹ sì fi èyí dán mi wò.', memE: 'Bring ye all the tithes into the storehouse... and prove me now herewith.' },
        { y: 'Iṣẹ́ Ìránṣẹ́ Àdúrà àti Ìbẹ̀bẹ̀', e: 'The Ministry of Intercessory Prayer', ref: '1 Tímótì 2:1-8; Jákọ́bù 5:13-18', memY: 'Àdúrà olódodo tí ń fi ìtara gbà ní agbára púpọ̀ nínú iṣẹ́ rẹ̀.', memE: 'The effectual fervent prayer of a righteous man availeth much.' },
        { y: 'Ìkọ́lé Ìdílé Kristẹni lórí Àpáta', e: 'Building a Christian Family on the Rock', ref: 'Éfésù 5:21-33; 6:1-4', memY: 'Èmi àti ilé mi, àwa yóò máa sin Olúwa.', memE: 'As for me and my house, we will serve the Lord.' }
      ]
    },
    {
      month: 'july',
      monthYoruba: 'Oṣù Keje',
      count: 4,
      startLesson: 44,
      quarterThemeY: 'Ìjọba Ọlọ́run, Ìjọ àti Ìhìn Rere',
      quarterThemeE: 'The Kingdom of God, the Church & the Gospel',
      topics: [
        { y: 'Ìwà Ọmọlúwàbí àti Ẹ̀rí Rere láwùjọ', e: 'Integrity and Christian Testimony in Society', ref: 'Mátíù 5:13-16; Fílípì 2:14-16', memY: 'Bẹ́ẹ̀ ni kí ìmọ́lẹ̀ yín mọ́lẹ̀ níwájú àwọn ènìyàn.', memE: 'Let your light so shine before men, that they may see your good works.' },
        { y: 'Fífi Ẹ̀mí Tútù Bá Àwọn Ẹlòmíràn Lò', e: 'Meekness and Restoring the Erring Brother', ref: 'Gálátíà 6:1-5; Mátíù 18:15-20', memY: 'Bí a bá mú ènìyàn nínú ẹ̀ṣẹ̀ kan, ẹ̀yin tí í ṣe ti ẹ̀mí, ẹ mú irú ẹni bẹ́ẹ̀ bọ̀ sípò.', memE: 'If a man be overtaken in a fault, ye which are spiritual, restore such an one.' },
        { y: 'Àìṣègbè àti Ìdájọ́ Òtítọ́ Ọlọ́run', e: 'God’s Impartiality and True Justice', ref: 'Jákọ́bù 2:1-13; Róòmù 2:6-11', memY: 'Nítorí kò sí ojúsàájú lọ́dọ̀ Ọlọ́run.', memE: 'For there is no respect of persons with God.' },
        { y: 'Àǹfààní àti Èrè Fífi Ọkàn Sin Ọlọ́run', e: 'Serving God Wholeheartedly and Its Eternal Rewards', ref: 'Kólósè 3:23-25; 1 Kọ́ríńtì 15:58', memY: 'Ẹ máa ṣe ohunkóhun tí ẹ bá ń ṣe tọkàntọkàn, bí sí Olúwa, kì í ṣe sí ènìyàn.', memE: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.' }
      ]
    },
    {
      month: 'august',
      monthYoruba: 'Oṣù Kẹjọ',
      count: 5,
      startLesson: 48,
      quarterThemeY: 'Àbọ̀ Kristi, Ìdájọ́ Ayérayé àti Ògo Ọ̀run',
      quarterThemeE: 'The Second Coming, Eternal Judgment & Heavenly Glory',
      topics: [
        { y: 'Àbọ̀ Kristi Kejì: Ìmúrasílẹ̀ fún Ọkọ Ìyàwó', e: 'The Second Coming of Christ: Ready for the Bridegroom', ref: '1 Tẹsalóníkà 4:13-18; Mátíù 25:1-13', memY: 'Nítorí Olúwa fúnra Rẹ̀ yóò sọ̀kalẹ̀ láti ọ̀run wá pẹ̀lú igbe.', memE: 'For the Lord himself shall descend from heaven with a shout.' },
        { y: 'Ìtẹ́ Ìdájọ́ Kristi fún Àwọn Onígbàgbọ́', e: 'The Judgment Seat of Christ (Bema)', ref: '2 Kọ́ríńtì 5:1-10; Róòmù 14:10-12', memY: 'Nítorí gbogbo wa ni yóò fi ara hàn níwájú ìtẹ́ ìdájọ́ Kristi.', memE: 'For we must all appear before the judgment seat of Christ.' },
        { y: 'Ọ̀run Tuntun àti Ayé Tuntun', e: 'A New Heaven and a New Earth', ref: 'Ìfihàn 21:1-8; 2 Pétérù 3:10-14', memY: 'Mo sì rí ọ̀run tuntun kan àti ayé tuntun kan.', memE: 'And I saw a new heaven and a new earth.' },
        { y: 'Jerúsálẹ́mù Ọ̀run: Ilé Ìsinmi Ayérayé', e: 'The Heavenly Jerusalem: Our Eternal Abode', ref: 'Ìfihàn 22:1-7; Jòhánù 14:1-6', memY: 'Ní ilé Baba Mi àyè púpọ̀ wà; ìbá má rí bẹ́ẹ̀, èmi kì bá ti sọ fún yín.', memE: 'In my Father’s house are many mansions: if it were not so, I would have told you.' },
        { y: 'Àṣẹ Ìparí: "Bẹ́ẹ̀ ni, Èmi ń Bọ̀ Kánkán"', e: 'The Final Promise: "Surely I Come Quickly"', ref: 'Ìfihàn 22:12-21', memY: 'Ẹni tí ń jẹ́rìí nǹkan wọ̀nyí wí pé, Dájúdájú Èmi ń bọ̀ kánkán. Àmín. Bẹ́ẹ̀ ni, máa bọ̀, Jésù Olúwa.', memE: 'He which testifieth these things saith, Surely I come quickly. Amen. Even so, come, Lord Jesus.' }
      ]
    }
  ];

  const generatedLessons: SundaySchoolLesson[] = [];

  for (const mData of monthLessonsData) {
    for (let i = 0; i < mData.count; i++) {
      const sundayNum = i + 1;
      const lessonNum = mData.startLesson + i;
      const t = mData.topics[i];
      const dateDay = sundayNum * 7 - (sundayNum > 2 ? 2 : 0);

      generatedLessons.push({
        id: `ssl-${lessonNum}`,
        lessonNumber: lessonNum,
        quarterNumber: 4,
        quarterThemeYoruba: mData.quarterThemeY,
        quarterThemeEnglish: mData.quarterThemeE,
        unitTitleYoruba: `Ẹyọ ${sundayNum}: ${t.y}`,
        unitTitleEnglish: `Unit ${sundayNum}: ${t.e}`,
        month: mData.month,
        monthYoruba: mData.monthYoruba,
        sundayOfMonth: sundayNum,
        date: `Ọjọ́ Ìsinmi, ${dateDay} ${mData.monthYoruba}`,
        dateEnglish: `${sundayNum === 1 ? '1st' : sundayNum === 2 ? '2nd' : sundayNum === 3 ? '3rd' : `${sundayNum}th`} Sunday of ${mData.month.charAt(0).toUpperCase() + mData.month.slice(1)} • Day ${dateDay}`,
        dateYoruba: `Ọjọ́ Ìsinmi ${sundayNum === 1 ? 'Àkọ́kọ́' : sundayNum === 2 ? 'Kejì' : sundayNum === 3 ? 'Kẹta' : sundayNum === 4 ? 'Kẹrin' : 'Kárùn-ún'} • ${dateDay} ${mData.monthYoruba}`,
        topicYoruba: t.y,
        topicEnglish: t.e,
        biblePassage: t.ref,
        memoryVerse: {
          reference: t.ref.split(';')[0],
          textYoruba: t.memY,
          textEnglish: t.memE,
        },
        centralTruth: {
          yoruba: `${t.y} jẹ́ kókó pàtàkì nínú ìgbé-ayé onígbàgbọ́ tí ó fẹ́ láti wu Ọlọ́run.`,
          english: `${t.e} is an indispensable spiritual foundation for every believer seeking to honor Christ.`,
        },
        lessonAims: {
          yoruba: [
            `Láti kọ́ ẹ̀kọ́ Bíbélì lórí ${t.y}.`,
            'Láti fi ọ̀rọ̀ náà sílò nínú ìgbé-ayé ojoojúmọ́.',
            'Láti fi ìdí ìgbàgbọ́ wa múlẹ̀ nínú Kristi.'
          ],
          english: [
            `Study the biblical doctrine concerning ${t.e}.`,
            'Apply biblical truths to daily walk and decisions.',
            'Strengthen faith and steadfastness in Christ Jesus.'
          ]
        },
        introduction: {
          yoruba: `Ẹ̀kọ́ yìí rán wa létí nípa ìpè Ọlọ́run fún ìgbé-ayé wa. Nípa gbígbọ́ran sí Ọ̀rọ̀ Rẹ̀, a ó rí oore-ọ̀fẹ́ láti gbé ní ìbámu pẹ̀lú ìfẹ́ Rẹ̀ mímọ́.`,
          english: `This lesson anchors our faith in God’s unfailing promises. As we submit to His eternal Word, the Holy Spirit equips us to live blamelessly before Him.`
        },
        outlines: [
          {
            outlineNumber: 1,
            titleYoruba: `Àkòrí 1: Ìpìlẹ̀ Ọ̀rọ̀ Ọlọ́run (${t.ref})`,
            titleEnglish: `Outline 1: Scriptural Foundations (${t.ref})`,
            contentYoruba: [
              'Ọ̀rọ̀ Ọlọ́run ṣe kedere lórí kókó ẹ̀kọ́ yìí.',
              'Gbígbọ́ran sí àṣẹ Ọlọ́run ń mú ìbùkún àti àlàáfíà wá.'
            ],
            contentEnglish: [
              'God’s Word provides clear instructions on this theme.',
              'Obedience to divine principles guarantees spiritual prosperity and joy.'
            ],
            scriptures: [t.ref.split(';')[0]],
            discussionQuestionYoruba: `Kí ni ẹ̀kọ́ pàtàkì tí a lè kọ́ nínú àkòrí yìí?`,
            discussionQuestionEnglish: `What key lesson can we draw from this outline today?`
          },
          {
            outlineNumber: 2,
            titleYoruba: `Àkòrí 2: Ìṣiṣẹ́ Ọ̀rọ̀ náà nínú Ayé Wa`,
            titleEnglish: `Outline 2: Practical Living and Kingdom Impact`,
            contentYoruba: [
              'Kí a má ṣe jẹ́ olùgbọ́ nìkan bí kò ṣe olùṣe ọ̀rọ̀ náà.',
              'Fífi àpẹẹrẹ rere lélẹ̀ níwájú gbogbo ènìyàn.'
            ],
            contentEnglish: [
              'Be ye doers of the Word, and not hearers only.',
              'Let your light shine before others with enduring integrity.'
            ],
            scriptures: ['Jakobu 1:22-25'],
            discussionQuestionYoruba: `Báwo ni a ṣe lè fi èyí hàn nínú ìwà wa lónìí?`,
            discussionQuestionEnglish: `How do we demonstrate this practically in daily life?`
          }
        ],
        practicalApplication: {
          yoruba: `Gbé ẹ̀kọ́ ${t.y} wọ̀ nínú ìṣe rẹ ní ọ̀sẹ̀ yìí.`,
          english: `Put the truth of ${t.e} into deliberate practice this week.`
        },
        summary: {
          yoruba: `Ọ̀rọ̀ Ọlọ́run jẹ́ ìmọ́lẹ̀ fún ẹsẹ̀ wa àti fìtílà fún ipa ọ̀nà wa.`,
          english: `Thy Word is a lamp unto my feet, and a light unto my path.`
        },
        closingPrayer: {
          yoruba: `Olúwa, fi agbára Rẹ kún mi láti ṣe olùṣe Ọ̀rọ̀ Rẹ ní gbogbo ọjọ́. Àmín.`,
          english: `Lord, empower me by Your Spirit to be a faithful doer of Your Word daily. Amen.`
        },
        dailyReadings: [
          { dayYoruba: 'Ọjọ́ Ajé (Monday)', dayEnglish: 'Monday', scripture: t.ref.split(';')[0], themeYoruba: 'Ìpìlẹ̀ Ọ̀rọ̀ Ọlọ́run', themeEnglish: 'Biblical foundation' },
          { dayYoruba: 'Ọjọ́ Ìṣẹ́gun (Tuesday)', dayEnglish: 'Tuesday', scripture: 'Saamu 119:9-16', themeYoruba: 'Fífi Ọ̀rọ̀ pa mọ́ sínú ọkàn', themeEnglish: 'Hiding the Word in the heart' },
          { dayYoruba: 'Ọjọ́ Rú (Wednesday)', dayEnglish: 'Wednesday', scripture: 'Owe 3:1-8', themeYoruba: 'Gbígbẹ́kẹ̀lé Olúwa tọkàntọkàn', themeEnglish: 'Trusting the Lord with all thine heart' },
          { dayYoruba: 'Ọjọ́ Bọ̀ (Thursday)', dayEnglish: 'Thursday', scripture: 'Jakobu 1:19-27', themeYoruba: 'Olùṣe Ọ̀rọ̀ kì í ṣe olùgbọ́ nìkan', themeEnglish: 'Doers of the Word not hearers only' },
          { dayYoruba: 'Ọjọ́ Ẹtì (Friday)', dayEnglish: 'Friday', scripture: '2 Timoti 3:14-17', themeYoruba: 'Gbogbo Ìwé Mímọ́ wúlò fún ẹ̀kọ́', themeEnglish: 'All Scripture is profitable for doctrine' },
          { dayYoruba: 'Ọjọ́ Àbámẹ́ta (Saturday)', dayEnglish: 'Saturday', scripture: 'Saamu 23:1-6', themeYoruba: 'Olúwa ni olùṣọ́-àgùntàn mi', themeEnglish: 'The Lord is my shepherd' }
        ]
      });
    }
  }

  return [...baseLessons, ...generatedLessons];
}

export const allSundaySchoolLessons: SundaySchoolLesson[] = getAllSundaySchoolLessons();

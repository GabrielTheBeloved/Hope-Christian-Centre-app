export interface MonthInfo {
  id: string; // lowercase name: 'january', 'february', etc.
  nameEnglish: string;
  nameYoruba: string;
  shortEnglish: string;
  shortYoruba: string;
  monthIndex: number; // 0 to 11 (matches Date.getMonth())
  quarter: number; // 1 to 4
  sundayCount: number;
}

// All 12 months of the church year from January to December
export const YEAR_MONTHS: MonthInfo[] = [
  {
    id: 'january',
    nameEnglish: 'January',
    nameYoruba: 'Oṣù Kíní (January)',
    shortEnglish: 'Jan',
    shortYoruba: 'Kíní',
    monthIndex: 0,
    quarter: 2,
    sundayCount: 4,
  },
  {
    id: 'february',
    nameEnglish: 'February',
    nameYoruba: 'Oṣù Kejì (February)',
    shortEnglish: 'Feb',
    shortYoruba: 'Kejì',
    monthIndex: 1,
    quarter: 2,
    sundayCount: 4,
  },
  {
    id: 'march',
    nameEnglish: 'March',
    nameYoruba: 'Oṣù Kẹta (March)',
    shortEnglish: 'Mar',
    shortYoruba: 'Kẹta',
    monthIndex: 2,
    quarter: 3,
    sundayCount: 5,
  },
  {
    id: 'april',
    nameEnglish: 'April',
    nameYoruba: 'Oṣù Kẹrin (April)',
    shortEnglish: 'Apr',
    shortYoruba: 'Kẹrin',
    monthIndex: 3,
    quarter: 3,
    sundayCount: 4,
  },
  {
    id: 'may',
    nameEnglish: 'May',
    nameYoruba: 'Oṣù Kàrún (May)',
    shortEnglish: 'May',
    shortYoruba: 'Kàrún',
    monthIndex: 4,
    quarter: 3,
    sundayCount: 5,
  },
  {
    id: 'june',
    nameEnglish: 'June',
    nameYoruba: 'Oṣù Kẹfà (June)',
    shortEnglish: 'Jun',
    shortYoruba: 'Kẹfà',
    monthIndex: 5,
    quarter: 4,
    sundayCount: 4,
  },
  {
    id: 'july',
    nameEnglish: 'July',
    nameYoruba: 'Oṣù Keje (July)',
    shortEnglish: 'Jul',
    shortYoruba: 'Keje',
    monthIndex: 6,
    quarter: 4,
    sundayCount: 4,
  },
  {
    id: 'august',
    nameEnglish: 'August',
    nameYoruba: 'Oṣù Kẹjọ (August)',
    shortEnglish: 'Aug',
    shortYoruba: 'Kẹjọ',
    monthIndex: 7,
    quarter: 4,
    sundayCount: 5,
  },
  {
    id: 'september',
    nameEnglish: 'September',
    nameYoruba: 'Oṣù Kẹsàn-án (September)',
    shortEnglish: 'Sep',
    shortYoruba: 'Kẹsàn',
    monthIndex: 8,
    quarter: 1,
    sundayCount: 4,
  },
  {
    id: 'october',
    nameEnglish: 'October',
    nameYoruba: 'Oṣù Kẹwàá (October)',
    shortEnglish: 'Oct',
    shortYoruba: 'Kẹwàá',
    monthIndex: 9,
    quarter: 1,
    sundayCount: 4,
  },
  {
    id: 'november',
    nameEnglish: 'November',
    nameYoruba: 'Oṣù Kọkànlá (November)',
    shortEnglish: 'Nov',
    shortYoruba: 'Kọkànlá',
    monthIndex: 10,
    quarter: 1,
    sundayCount: 5,
  },
  {
    id: 'december',
    nameEnglish: 'December',
    nameYoruba: 'Oṣù Kejìlá (December)',
    shortEnglish: 'Dec',
    shortYoruba: 'Kejìlá',
    monthIndex: 11,
    quarter: 2,
    sundayCount: 4,
  },
];

export function getMonthInfoByIndex(index: number): MonthInfo {
  const safeIndex = ((index % 12) + 12) % 12;
  return YEAR_MONTHS[safeIndex];
}

export function getMonthInfoById(id: string): MonthInfo | undefined {
  return YEAR_MONTHS.find((m) => m.id.toLowerCase() === id.toLowerCase());
}

export function getCurrentMonthInfo(date: Date = new Date()): MonthInfo {
  const currentMonthIdx = date.getMonth();
  return YEAR_MONTHS[currentMonthIdx] || YEAR_MONTHS[8];
}


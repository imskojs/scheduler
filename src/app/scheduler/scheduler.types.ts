export type DateType = 'month'|'week';
export type Direction = 'prev' | 'next';

export class SimpleDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  daysOfWeek: number;
  category?: string;
}

export class SimpleDate {
  year: number;
  month: number;
  day: number;
  daysOfWeek: number;
  category?: string;
}

export class SimpleTime {
  hour: number;
  minute: number;
}





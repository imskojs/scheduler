
export type DateType = 'month' | 'week';

export type Direction = 'prev' | 'next';

export interface ScheduleGroup  {
  [key: string]: Schedule[];
}

export interface Day {
  [key: number]: Schedule;
  meta: {
    category: string,
    year: number,
    month: number,
    day: number,
    daysOfWeek: number
  };
}


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

export class Schedule {
  start: number;
  count: number;
  end: number;
  category: string;
  year: number;
  month: number;
  day: number;
  daysOfWeek?: number;
}






export type DateType = 'month' | 'week';

export type Direction = 'prev' | 'next';

export interface ScheduleGroup {
  [key: string]: Schedule[];
}

export interface Day extends Array<any> {
  meta?: {
    category: string,
    year: number,
    month: number,
    day: number,
    daysOfWeek: number
  };

  [key: number]: Schedule;

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
  title: string;
  content: string;
  start: number;
  count: number;
  end: number;
  category: string;
  year: number;
  month: number;
  day: number;
  daysOfWeek?: number;
}






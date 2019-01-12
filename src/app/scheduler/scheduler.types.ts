type DaysOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' |
  'friday' | 'saturday' | 'sunday';

export class SimpleDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  daysOfWeek: DaysOfWeek;
}

export class SimpleDate {
  year: number;
  month: number;
  day: number;
  daysOfWeek: DaysOfWeek;
}

export class SimpleTime {
  hour: number;
  minute: number;
}



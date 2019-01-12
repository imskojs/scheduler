type DaysOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' |
  'friday' | 'saturday' | 'sunday';

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


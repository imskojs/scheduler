import { Injectable } from '@angular/core';
import { SimpleDate } from './scheduler.types';

const daysOfWeekMap = {
  [1]: 'monday', [2]: 'tuesday', [3]: 'wednesday', [4]: 'thursday',
  [5]: 'friday', [6]: 'saturday', [7]: 'sunday'
};

@Injectable()
export class SchedulerService {

  constructor() { }

  static simpleDate(timestamp: number): SimpleDate {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const daysOfWeek = daysOfWeekMap[date.getDay()];
    return { year, month, day, daysOfWeek };
  }

}

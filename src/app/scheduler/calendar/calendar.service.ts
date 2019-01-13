import { Injectable } from '@angular/core';
import { SimpleDateTime } from '../scheduler.types';
import { SchedulerService } from '../scheduler.service';

const { getDaysInMonth, getFirstDayOfWeek } = SchedulerService;

@Injectable()
export class CalendarService {

  constructor() { }

  static generateMonth(dateTime: SimpleDateTime) {
    const TOTAL_CELLS = 7 * 6; // if first day is saturday then we need 6 rows
    const { year, month } = dateTime;
    const numberOfDays = getDaysInMonth(year, month);
    const firstDayOfWeek = getFirstDayOfWeek(year, month);
    const numberOfDaysLeft = TOTAL_CELLS - numberOfDays - firstDayOfWeek;

    const previousMonthDays = Array(firstDayOfWeek).fill(null).map(() => []);

    const selectedMonthDays: [][] = Array(numberOfDays).fill(null).map((_, index) => {
      const day: any = [];
      day.meta = {
        id: '' + year + month + index + 1,
        year, month,
        day: index + 1,
        daysOfWeek: (firstDayOfWeek + index) % 7
      };
      return day;
    });

    const nextMonthDays = Array(numberOfDaysLeft).fill(null).map(() => []);

    return [...previousMonthDays, ...selectedMonthDays, ...nextMonthDays];
  }

}

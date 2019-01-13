import { Injectable } from '@angular/core';
import { SimpleDateTime, Schedule, ScheduleGroup, Day } from '../scheduler.types';
import { SchedulerService } from '../scheduler.service';

const { getDaysInMonth, getFirstDayOfWeek, toCategory } = SchedulerService;

@Injectable()
export class CalendarService {

  constructor() { }

  static generateMonth(dateTime: SimpleDateTime) {
    const TOTAL_CELLS = 7 * 6; // if first day is saturday then we need 6 rows
    const { year, month } = dateTime;

    const daysInCurrMonth = getDaysInMonth(year, month);
    const firstDayOfWeek = getFirstDayOfWeek(year, month);
    const numberOfDaysLeft = TOTAL_CELLS - daysInCurrMonth - firstDayOfWeek;

    const previousMonthDays = Array(firstDayOfWeek).fill(null).map(() => []);

    const selectedMonthDays: Day[] = Array(daysInCurrMonth).fill(null).map((_, index) => {
      const day: Day = [];
      day.meta = {
        category: toCategory(year, month, index + 1),
        year, month,
        day: index + 1,
        daysOfWeek: (firstDayOfWeek + index) % 7
      };
      return day;
    });

    const nextMonthDays = Array(numberOfDaysLeft).fill(null).map(() => []);

    return [...previousMonthDays, ...selectedMonthDays, ...nextMonthDays];
  }

  static addSchedulesToMonth(month: Day[], schedules: ScheduleGroup) {

  }


}

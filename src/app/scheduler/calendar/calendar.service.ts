import {Injectable} from '@angular/core';
import {Day, Schedule, ScheduleGroup, SimpleDateTime} from '../scheduler.types';
import {SchedulerService} from '../scheduler.service';
import {Observable, Subject} from 'rxjs';

const {getDaysInMonth, getFirstDayOfWeek, toCategory} = SchedulerService;

@Injectable()
export class CalendarService {

  private renderMonthSub: Subject<boolean> = new Subject();
  public renderMonth$: Observable<boolean> = this.renderMonthSub.asObservable();

  constructor() {
  }

  static generateMonth(dateTime: SimpleDateTime) {
    const TOTAL_CELLS = 7 * 6; // if first day is saturday then we need 6 rows
    const {year, month} = dateTime;

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

    const newMonth: any = [...previousMonthDays, ...selectedMonthDays, ...nextMonthDays];
    newMonth.meta = {year: dateTime.year, month: dateTime.month};
    return newMonth;
  }

  static addSchedulesToMonth(month: Day[], scheduleGroup: ScheduleGroup): Day[] {
    return month.map((day: Day) => {
      const category = day && day.meta && day.meta.category;
      if (!category) {
        return [];
      }
      const schedules = scheduleGroup[category];
      if (!schedules) {
        return day;
      }
      const sortedSchedules = [...schedules].sort((a: Schedule, b: Schedule) => a.start - b.start);
      day.push(...sortedSchedules);
      return day;
    });
  }

  static emptySchedules(month: Day[]): Day[] {
    month.forEach(day => day.length = 0);
    return month;
  }

  public renderMonth(): void {
    this.renderMonthSub.next();
  }

}

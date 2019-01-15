import {Injectable} from '@angular/core';
import {Day, Schedule, ScheduleGroup, SimpleDateTime} from '../scheduler.types';
import {SchedulerService} from '../scheduler.service';
import {Observable, Subject} from 'rxjs';

const {getDaysInMonth, getFirstDayOfWeek, toCategory, getDayOfWeek} = SchedulerService;

@Injectable()
export class CalendarService {

  private renderMonthSub: Subject<boolean> = new Subject();
  public renderMonth$: Observable<boolean> = this.renderMonthSub.asObservable();

  private renderWeekSub: Subject<boolean> = new Subject();
  public renderWeek$: Observable<boolean> = this.renderWeekSub.asObservable();

  private renderHourSub: Subject<boolean> = new Subject();
  public renderHour$: Observable<boolean> = this.renderHourSub.asObservable();

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

  static generateWeek(dateTime: SimpleDateTime) {
    const TOTAL_CELLS = 7;
    const MILLIDAY = 24 * 60 * 60 * 1000;
    const {year, month, day} = dateTime;
    const numberOfDaysBefore = getDayOfWeek(year, month, day);
    const numberOfDaysAfter = TOTAL_CELLS - (numberOfDaysBefore + 1);
    const baseTimeStamp = SchedulerService.toTimestamp(dateTime);
    const daysBefore: SimpleDateTime[] = Array(numberOfDaysBefore).fill(null).map((_, i) => {
      const milliDayToSubtract = MILLIDAY * (i + 1);
      const newTimeStamp = Math.floor(baseTimeStamp - milliDayToSubtract);
      return SchedulerService.toSimpleDateTime(newTimeStamp);
    }).reverse();

    const daysAfter: SimpleDateTime[] = Array(numberOfDaysAfter).fill(null).map((_, i) => {
      const milliDayToAdd = MILLIDAY * (i + 1);
      const newTimeStamp = Math.floor(baseTimeStamp + milliDayToAdd);
      return SchedulerService.toSimpleDateTime(newTimeStamp);
    });
    const week: SimpleDateTime[] = daysBefore.concat([dateTime]).concat(daysAfter);

    const newWeek: any = week.map((simpleDateTime, i) => {
      const dayOne: Day = [];
      const {year, month, day} = simpleDateTime;
      dayOne.meta = {
        category: toCategory(year, month, day),
        year, month,
        day: day,
        daysOfWeek: i
      };
      return dayOne;
    });
    const firstDay = newWeek[0];
    newWeek.meta = {year: firstDay.meta.year, month: firstDay.meta.month, day: firstDay.meta.day};
    return newWeek;
  }

  static addSchedules(month: Day[], scheduleGroup: ScheduleGroup): Day[] {
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

  public renderWeek(): void {
    this.renderWeekSub.next();
  }

  public renderHour(): void {
    this.renderHourSub.next();
  }

}

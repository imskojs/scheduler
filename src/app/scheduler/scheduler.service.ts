import {Injectable} from '@angular/core';
import {Schedule, ScheduleGroup, SimpleDate, SimpleDateTime, SimpleTime} from './scheduler.types';
import {Observable, of, Subject} from 'rxjs';

@Injectable()
export class SchedulerService {

  private addScheduleSub: Subject<Schedule> = new Subject<Schedule>();

  constructor() {
  }

  static toSimpleDate(timestamp: number): SimpleDate {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const daysOfWeek = date.getDay();
    const category = SchedulerService.toCategory(year, month, day);
    return {year, month, day, daysOfWeek, category};
  }

  static toSimpleTime(timestamp: number): SimpleTime {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return {hour, minute};
  }

  static toTimestamp(simpleDateTime: SimpleDateTime): number {
    const {year, day, hour, minute = 0} = simpleDateTime;
    let {month} = simpleDateTime;
    const date = new Date(year, --month, day, hour, minute);
    return date.getTime();
  }

  static toSimpleDateTime(timestamp: number): SimpleDateTime {
    const simpleDate = SchedulerService.toSimpleDate(timestamp);
    const simpleTime = SchedulerService.toSimpleTime(timestamp);
    return Object.assign({}, simpleDate, simpleTime);
  }

  static getDaysInMonth(year, month): number {
    return new Date(year, month, 0).getDate();
  }

  static getFirstDayOfWeek(year, month) {
    const date = new Date(year, month - 1, 1);
    return date.getDay(); // 0: sunday, ~ 6: saturday
  }

  static toCategory(year, month, day) {
    return `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
  }

  static groupSchedules(schedules: Schedule[], cached?: ScheduleGroup): ScheduleGroup {
    return schedules.reduce((scheduleGroup: ScheduleGroup, schedule: Schedule) => {
      if (!scheduleGroup[schedule.category]) {
        scheduleGroup[schedule.category] = [];
      }
      scheduleGroup[schedule.category].push(schedule);
      return scheduleGroup;
    }, cached || <ScheduleGroup>{});
  }

  public getSchedules(month: number, week: number | null): Observable<Schedule[]> {
    // http goes here
    return of([
      {
        start: 17, count: 1, end: 18,
        category: '20190121', year: 2019, month: 1,
        day: 21, daysOfWeek: 4, title: '돈대크반 돈대기리기리asdfasdfasdfasdfasdfasdf', content: '노래를 한다네 므매 돈돈돈을? 뭥? 미? 졸려미?'
      },
      {
        start: 12, count: 1, end: 13,
        category: '20190121', year: 2019, month: 1,
        day: 21, daysOfWeek: 4, title: '카카오와', content: '춤을 춘다네 음매'
      },
      {
        start: 13, count: 1, end: 14,
        category: '20190121', year: 2019, month: 1,
        day: 21, daysOfWeek: 4, title: '구구릴', content: '노래를 한다네 므매'
      },
    ]);
  }


}

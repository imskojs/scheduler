import {Injectable} from '@angular/core';
import {Schedule, ScheduleGroup, SimpleDate, SimpleDateTime, SimpleTime} from './scheduler.types';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SchedulerService {

  constructor(private httpClient: HttpClient) {
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

  public addSchedule(schedule) {
    // should return Schedules of of updating schedule Year, Month;
    return this.httpClient.post('http://localhost:3000/schedules', schedule).toPromise();
  }


  public getSchedules(year: number, month: number): Promise<Schedule[]> {
    // http goes here
    return this.httpClient.get<Schedule[]>(`http://localhost:3000/schedules/${year}/${month}`).toPromise();
  }


}

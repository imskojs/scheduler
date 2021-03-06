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
    const {year, day, hour = 0, minute = 0} = simpleDateTime;
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

  static getDayOfWeek(year, month, day) {
    const date = new Date(year, month - 1, day);
    return date.getDay();
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

  public addSchedule(schedule: Schedule) {
    schedule.timestamp = SchedulerService.toTimestamp(schedule);
    return this.httpClient.post('http://localhost:3000/schedules', schedule).toPromise()
      .catch(({error: {message}}) => {
        alert(message);
      });
  }

  public updateSchedule(schedule) {
    schedule.timestamp = SchedulerService.toTimestamp(schedule);
    return this.httpClient.put('http://localhost:3000/schedules', schedule).toPromise()
      .catch(({error: {message}}) => {
        alert(message);
      });
  }

  public deleteSchedule(schedule) {
    return this.httpClient.delete(`http://localhost:3000/schedules/${schedule.$loki}`).toPromise()
      .catch(({error: {message}}) => {
        alert(message);
      });
  }


  public getSchedules(year: number, month: number, day: number = 99): Promise<Schedule[]> {
    return this.httpClient.get<Schedule[]>(`http://localhost:3000/schedules/${year}/${month}/${day}`).toPromise();
  }


}

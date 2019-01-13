import { Injectable } from '@angular/core';
import { SimpleDate, SimpleTime, SimpleDateTime } from './scheduler.types';

@Injectable()
export class SchedulerService {

  constructor() { }

  static toSimpleDate(timestamp: number): SimpleDate {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const daysOfWeek = date.getDay();
    return { year, month, day, daysOfWeek };
  }

  static toSimpleTime(timestamp: number): SimpleTime {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return { hour, minute };
  }

  static toTimestamp(simpleDateTime: SimpleDateTime): number {
    const { year, day, hour, minute = 0 } = simpleDateTime;
    let { month } = simpleDateTime;
    const date = new Date(year, --month, day, hour, minute);
    return date.getTime();
  }

  static toSimpleDateTime(timestamp: number): SimpleDateTime {
    const simpleDate = SchedulerService.toSimpleDate(timestamp);
    const simpleTime = SchedulerService.toSimpleTime(timestamp);
    const simpleDateTime: SimpleDateTime = Object.assign({}, simpleDate, simpleTime);
    return simpleDateTime;
  }

  static getDaysInMonth(year, month): number {
    return new Date(year, month, 0).getDate();
  }

  static getFirstDayOfWeek(year, month) {
    const date = new Date(year, month - 1, 1);
    return date.getDay(); // 0: sunday, ~ 6: saturday
  }

}

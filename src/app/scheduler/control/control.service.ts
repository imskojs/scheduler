import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SimpleDateTime, DateType, Direction } from '../scheduler.types';
import { startWith, shareReplay, withLatestFrom, map } from 'rxjs/operators';

import { SchedulerService } from '../scheduler.service';
const { toSimpleDateTime, getDaysInMonth, toTimestamp } = SchedulerService;

@Injectable()
export class ControlService {

  private selectedDateSub: Subject<SimpleDateTime> = new Subject();
  private selectedDate$: Observable<SimpleDateTime> = this.selectedDateSub.asObservable().pipe(
    startWith(toSimpleDateTime(Date.now())),
    shareReplay(1)
  );

  private selectedDateTypeSub: Subject<DateType> = new Subject();
  private selectedDateType$: Observable<DateType> = this.selectedDateTypeSub.asObservable().pipe(
    startWith('month' as DateType),
    shareReplay(1)
  );

  private nextDateDirectionSub: Subject<Direction> = new Subject();
  private nextDateDirection$: Observable<Direction> = this.nextDateDirectionSub.asObservable();

  constructor() { }

  public getSelectedDate(): Observable<SimpleDateTime> { return this.selectedDate$; }
  public selectDate(date: SimpleDateTime): void { this.selectedDateSub.next(date); }

  public getSelectedDateType(): Observable<DateType> { return this.selectedDateType$; }
  public selectDateType(dateType: DateType): void { this.selectedDateTypeSub.next(dateType); }

  public sendNextDateDirection(direction: Direction): void { this.nextDateDirectionSub.next(direction); }
  public getNextDate(): Observable<SimpleDateTime> {
    return this.nextDateDirection$.pipe(
      withLatestFrom(this.selectedDate$, this.selectedDateType$),
      map(([direction, selectedDate, dateType]: [Direction, SimpleDateTime, DateType]) => {
        const daysInMonth = getDaysInMonth(selectedDate.year, selectedDate.month);
        const daysInWeek = 7;
        const milliDay = 86400000;
        const milliMonth = Math.floor(daysInMonth * milliDay);
        const milliWeek = Math.floor(daysInWeek * milliDay);
        let timestamp = toTimestamp(selectedDate);
        const dirDateMap = {
          month: { prev: () => timestamp -= milliMonth, next: () => timestamp += milliMonth },
          week: { prev: () => timestamp -= milliWeek, next: () => timestamp += milliWeek },
        };
        dirDateMap[dateType][direction]();
        return toSimpleDateTime(timestamp);
      })
    );
  }

}

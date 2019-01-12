import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SimpleDateTime } from '../scheduler.types';
import { startWith, shareReplay } from 'rxjs/operators';

import { SchedulerService } from '../scheduler.service';
const { toSimpleDateTime } = SchedulerService;

@Injectable()
export class ControlService {

  private selectedDateSub: Subject<SimpleDateTime> = new Subject();

  private selectedDate$: Observable<SimpleDateTime> = this.selectedDateSub.asObservable().pipe(
    startWith(toSimpleDateTime(Date.now())),
    shareReplay(1)
  );

  constructor() { }

  public getSelectedDate(): Observable<SimpleDateTime> {
    return this.selectedDate$;
  }

  public selectDate(simpleDateTime: SimpleDateTime): void {
    this.selectedDateSub.next(simpleDateTime);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleDateTime, DateType, Direction } from '../scheduler.types';
import { Observable, Subject } from 'rxjs';
import { ControlService } from './control.service';
import { map, takeUntil } from 'rxjs/operators';
import { SchedulerService } from '../scheduler.service';
const { toTimestamp, getDaysInMonth, toSimpleDateTime } = SchedulerService;

@Component({
  selector: 'scheduler-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, OnDestroy {

  private UNSUB: Subject<null> = new Subject();

  public dateType: DateType;
  public selectedDateView$: Observable<string>;

  constructor(private controlService: ControlService) { }

  ngOnInit() {

    this.selectedDateView$ = this.controlService.getSelectedDate().pipe(
      map(({ year, month }: SimpleDateTime): string => `${year}년 ${month}월`)
    );

    this.controlService.getSelectedDateType().pipe(
      takeUntil(this.UNSUB)
    ).subscribe(
      (selectedDateType: DateType) => this.dateType = selectedDateType
    );

    this.controlService.getNextDate().pipe(
      takeUntil(this.UNSUB)
    ).subscribe(
      (nextDateTime: SimpleDateTime) => this.controlService.selectDate(nextDateTime)
    );

  }

  ngOnDestroy() {
    this.UNSUB.next();
    this.UNSUB.complete();
  }

  public selectDateType(dateType: DateType): void {
    this.controlService.selectDateType(dateType);
  }

  public sendNextDateDirection(direction: Direction): void {
    this.controlService.sendNextDateDirection(direction);
  }


}

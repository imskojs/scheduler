import {Component, OnInit} from '@angular/core';
import {ControlService} from '../control/control.service';
import {Day, Schedule, ScheduleGroup, SimpleDateTime} from '../scheduler.types';
import {distinctUntilChanged, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {SchedulerService} from '../scheduler.service';
import {CalendarService} from '../calendar/calendar.service';
import {merge, Observable, of, zip} from 'rxjs';

const {groupSchedules} = SchedulerService;
const {generateMonth, addSchedulesToMonth} = CalendarService;

@Component({
  selector: 'scheduler-calendar-monthly',
  templateUrl: './calendar-monthly.component.html',
  styleUrls: ['./calendar-monthly.component.scss']
})
export class CalendarMonthlyComponent implements OnInit {

  private monthGenerator$: Observable<Day[]>;

  public monthView$: Observable<Day[]>;

  constructor(
    private controlService: ControlService,
    private scheduleService: SchedulerService
  ) { }

  ngOnInit() {
    this.monthGenerator$ = this.controlService.getSelectedDate().pipe(
      distinctUntilChanged((prev: SimpleDateTime, curr: SimpleDateTime) => prev.month === curr.month),
      map((dateTime: SimpleDateTime) => generateMonth(dateTime))
    );


    this.monthView$ = merge(this.monthGenerator$).pipe(
      withLatestFrom(this.monthGenerator$),
      mergeMap(([_, month]) => zip(of(month), this.scheduleService.getSchedules(1, null))),
      map(([month, schedules]: [Day[], Schedule[]]) => {
        const scheduleGroup: ScheduleGroup = groupSchedules(schedules);
        return addSchedulesToMonth(month, scheduleGroup);
      })
    );
  }

  public trackByDayId(index, day) { return day.id; }



}




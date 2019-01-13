import { Component, OnInit } from '@angular/core';
import { ControlService } from '../control/control.service';
import { SimpleDateTime, Day, Schedule, ScheduleGroup } from '../scheduler.types';
import { distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { SchedulerService } from '../scheduler.service';
import { CalendarService } from '../calendar/calendar.service';
import { Observable, zip, of } from 'rxjs';

const { groupSchedules } = SchedulerService;
const { generateMonth, addSchedulesToMonth } = CalendarService;

@Component({
  selector: 'scheduler-calendar-monthly',
  templateUrl: './calendar-monthly.component.html',
  styleUrls: ['./calendar-monthly.component.scss']
})
export class CalendarMonthlyComponent implements OnInit {

  public monthView$: Observable<Day[]>;

  constructor(
    private controlService: ControlService,
    private scheduleService: SchedulerService
  ) { }

  ngOnInit() {
    this.monthView$ = this.controlService.getSelectedDate().pipe(

      distinctUntilChanged((prev: SimpleDateTime, curr: SimpleDateTime) => prev.month === curr.month),

      map((dateTime: SimpleDateTime) => generateMonth(dateTime)),

      mergeMap((month) => zip(of(month), this.scheduleService.getSchedules(1, null))),

      map(([month, schedules]: [Day[], Schedule[]]) => {
        const scheduleGroup: ScheduleGroup = groupSchedules(schedules);
        const filledMonth: Day[] = addSchedulesToMonth(month, scheduleGroup);
        return filledMonth;
      })

    );
  }

  public trackByDayId(index, day) { return day.id; }



}




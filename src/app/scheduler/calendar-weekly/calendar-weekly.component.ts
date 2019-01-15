import {Component, OnDestroy, OnInit} from '@angular/core';
import {Day, Schedule, ScheduleGroup, SimpleDateTime} from '../scheduler.types';
import {merge, Observable, of, Subject, zip} from 'rxjs';
import {CalendarService} from '../calendar/calendar.service';
import {ControlService} from '../control/control.service';
import {SchedulerService} from '../scheduler.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {map, mergeMap, takeUntil, tap, withLatestFrom} from 'rxjs/operators';


const {groupSchedules, toCategory, toSimpleTime} = SchedulerService;
const {generateWeek, addSchedules, emptySchedules} = CalendarService;

@Component({
  selector: 'scheduler-calendar-weekly',
  templateUrl: './calendar-weekly.component.html',
  styleUrls: ['./calendar-weekly.component.scss']
})
export class CalendarWeeklyComponent implements OnInit, OnDestroy {
  public week: Day[];
  public start = {hour: 0, minute: 0};
  public end = {hour: 0, minute: 0};
  public date = {year: null, month: null, day: null};
  public title = '';

  private weekGenerator$: Observable<Day[]>;
  private UNSUB: Subject<null> = new Subject();

  constructor(
    private calendarService: CalendarService,
    private controlService: ControlService,
    private scheduleService: SchedulerService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.weekGenerator$ = this.controlService.getSelectedDate().pipe(
      map((dateTime: SimpleDateTime) => generateWeek(dateTime))
    );

    merge(this.calendarService.renderWeek$, this.weekGenerator$).pipe(
      withLatestFrom(this.weekGenerator$, this.controlService.getSelectedDate()),
      mergeMap(([_, week, date]) => zip(of(week), this.scheduleService.getSchedules(date.year, date.month, date.day))),
      map(([week, schedules]: [Day[], Schedule[]]) => {
        const scheduleGroup: ScheduleGroup = groupSchedules(schedules);
        return addSchedules(emptySchedules(week), scheduleGroup);
      }),
      tap(() => this.calendarService.renderHour()),
      takeUntil(this.UNSUB)

    ).subscribe(week => this.week = week);
  }

  ngOnDestroy(): void {
    this.UNSUB.next();
  }

  public openModal(content, day) {
    if (!(day && day.meta)) {
      return;
    }
    this.date = day && day.meta;
    const start = toSimpleTime(Date.now());
    start.minute = 0;
    const end = Object.assign({}, start);
    end.hour++;
    this.start = start;
    this.end = end;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
      .then(() => this.handleSave())
      .then(() => this.calendarService.renderWeek())
      .catch(() => this.handleCancel());
  }

  public trackByDayId(index, day) {
    return day.id;
  }

  private handleSave() {
    const schedule: Schedule = {
      title: this.title, start: this.start.hour,
      count: Math.floor(this.end.hour - this.start.hour), end: this.end.hour,
      category: toCategory(this.date.year, this.date.month, this.date.day),
      year: this.date.year, month: this.date.month, day: this.date.day
    };
    this.title = '';
    return this.scheduleService.addSchedule(schedule);
  }

  private handleCancel() {
    console.log(0);
  }


}

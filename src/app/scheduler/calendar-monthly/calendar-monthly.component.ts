import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlService} from '../control/control.service';
import {Day, Schedule, ScheduleGroup, SimpleDateTime} from '../scheduler.types';
import {distinctUntilChanged, map, mergeMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {SchedulerService} from '../scheduler.service';
import {CalendarService} from '../calendar/calendar.service';
import {Observable, of, Subject, zip} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

const {groupSchedules, toCategory, toSimpleTime} = SchedulerService;
const {generateMonth, addSchedulesToMonth} = CalendarService;

@Component({
  selector: 'scheduler-calendar-monthly',
  templateUrl: './calendar-monthly.component.html',
  styleUrls: ['./calendar-monthly.component.scss']
})
export class CalendarMonthlyComponent implements OnInit, OnDestroy {

  public month: Day[];
  public start = {hour: 10, minute: 0};
  public end = {hour: 11, minute: 0};
  public date = {year: null, month: null, day: null};
  public title = '';
  public memo = '';

  private monthGenerator$: Observable<Day[]>;
  private UNSUB: Subject<null> = new Subject();

  constructor(
    private controlService: ControlService,
    private scheduleService: SchedulerService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.monthGenerator$ = this.controlService.getSelectedDate().pipe(
      distinctUntilChanged((prev: SimpleDateTime, curr: SimpleDateTime) => prev.month === curr.month),
      map((dateTime: SimpleDateTime) => generateMonth(dateTime))
    );

    this.monthGenerator$.pipe(
      withLatestFrom(this.monthGenerator$, this.controlService.getSelectedDate()),
      mergeMap(([_, month, date]) => zip(of(month), this.scheduleService.getSchedules(date.year, date.month))),
      map(([month, schedules]: [Day[], Schedule[]]) => {
        const scheduleGroup: ScheduleGroup = groupSchedules(schedules);
        return addSchedulesToMonth(month, scheduleGroup);
      }),
      takeUntil(this.UNSUB)
    ).subscribe(month => this.month = month);
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
      .then((result: 'save' | 'update') => this.handleSave())
      .then(month => {
        this.month = month;
      })
      .catch((reason) => {
        this.handleCancel();
      });
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
    this.memo = '';
    return this.scheduleService.addSchedule(schedule).then((schedules: Schedule[]) => {
      const scheduleGroup = groupSchedules(schedules);
      return of(scheduleGroup).pipe(
        withLatestFrom(this.monthGenerator$, this.controlService.getSelectedDate()),
        map(([grouped, month, simpleDateTime]) => {
          const monthMeta = (month as any).meta;
          if (simpleDateTime.year === monthMeta.year && simpleDateTime.month === monthMeta.month) {
            return addSchedulesToMonth(month, grouped);
          }
          return month;
        })
      ).toPromise();
    });

  }

  private handleCancel() {
    console.log(0);
  }

}




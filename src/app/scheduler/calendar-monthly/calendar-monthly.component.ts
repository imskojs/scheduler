import {Component, OnInit} from '@angular/core';
import {ControlService} from '../control/control.service';
import {Day, Schedule, ScheduleGroup, SimpleDateTime} from '../scheduler.types';
import {distinctUntilChanged, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {SchedulerService} from '../scheduler.service';
import {CalendarService} from '../calendar/calendar.service';
import {merge, Observable, of, zip} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

const {groupSchedules, toCategory, toSimpleTime} = SchedulerService;
const {generateMonth, addSchedulesToMonth} = CalendarService;

@Component({
  selector: 'scheduler-calendar-monthly',
  templateUrl: './calendar-monthly.component.html',
  styleUrls: ['./calendar-monthly.component.scss']
})
export class CalendarMonthlyComponent implements OnInit {

  public monthView$: Observable<Day[]>;
  public start = {hour: 10, minute: 0};
  public end = {hour: 11, minute: 0};
  public date = {year: null, month: null, day: null};
  public title = '';
  public memo = '';

  private monthGenerator$: Observable<Day[]>;

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


    this.monthView$ = merge(this.monthGenerator$).pipe(
      withLatestFrom(this.monthGenerator$),
      mergeMap(([_, month]) => zip(of(month), this.scheduleService.getSchedules(1, null))),
      map(([month, schedules]: [Day[], Schedule[]]) => {
        const scheduleGroup: ScheduleGroup = groupSchedules(schedules);
        return addSchedulesToMonth(month, scheduleGroup);
      })
    );
  }

  public openModal(content, day) {
    this.date = day && day.meta;
    const start = toSimpleTime(Date.now());
    start.minute = 0;
    const end = Object.assign({}, start);
    end.hour++;
    this.start = start;
    this.end = end;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
      .then((result: 'save' | 'update') => {
        console.log(result);
        this.handleSave();
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
      title: this.title, content: this.memo, start: this.start.hour,
      count: Math.floor(this.end.hour - this.start.hour), end: this.end.hour,
      category: toCategory(this.date.year, this.date.month, this.date.day),
      year: this.date.year, month: this.date.month, day: this.date.day,
    };
    console.log(schedule);
    this.title = '';
    this.memo = '';
  }

  private handleCancel() {
    console.log(0);
  }

}




import {Component, Input, OnInit} from '@angular/core';
import {Day, Schedule} from '../scheduler.types';
import {SchedulerService} from '../scheduler.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarService} from '../calendar/calendar.service';
import {startWith} from 'rxjs/operators';


const {toCategory} = SchedulerService;

const DAY_MAP = {[0]: '일', [1]: '월', [2]: '화', [3]: '수', [4]: '목', [5]: '금', [6]: '토'};

@Component({
  selector: 'scheduler-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {

  @Input() day: Day;
  @Input() index: number;
  @Input() type: string;
  public date = {year: null, month: null, day: null};
  // public month: Day[];
  public start = {hour: 10, minute: 0};
  public end = {hour: 11, minute: 0};
  public title = '';
  // this is to be filled with schedule. Duplicate schedule.
  public hoursInDay = Array(24).fill(null).map(() => ({}));
  public updating;
  public schedules;
  private id;

  constructor(
    private modalService: NgbModal,
    private scheduleService: SchedulerService,
    private calendarService: CalendarService
  ) {
  }

  ngOnInit() {
    // logic to add hour schedule in hour.
    // each schedule is passed in ordered.
    if (this.type === 'week') {
      this.calendarService.renderHour$.pipe(
        startWith(true)
      ).subscribe(() => {
        this.createHourlySchedules();
      });
    }
  }

  public renderDaysOfWeek(index) {
    if (index < 7 || this.type === 'week') {
      return DAY_MAP[index];
    }
  }

  public openUpdateModal(content, schedule, $event, oneDay, i) {
    $event.preventDefault();
    $event.stopPropagation();
    if (schedule.$loki) {
      const {year, month, title, day, start, end, $loki} = schedule;
      this.date = {year, month, day};
      this.start.hour = start;
      this.start.minute = 0;
      this.end.hour = end;
      this.end.minute = 0;
      this.title = title;
      this.id = $loki;
      this.updating = true;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
        .then((intent: 'delete' | 'update') => this.handleUpdate(intent))
        .then(() => {
          if (this.type === 'month') {
            return this.calendarService.renderMonth();
          }
          return this.calendarService.renderWeek();
        })
        .catch((reason) => this.handleCancel(reason));
    } else {
      const {year, month, day} = oneDay.meta;
      this.date = {year, month, day};
      this.start.hour = i;
      this.start.minute = 0;
      this.end.hour = i + 1;
      this.end.minute = 0;
      this.updating = false;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
        .then(() => this.handleSave())
        .then(() => {
          if (this.type === 'month') {
            return this.calendarService.renderMonth();
          }
          return this.calendarService.renderWeek();
        })
        .catch((reason) => this.handleCancel(reason));
    }
  }

  private createHourlySchedules(): void {
    this.day.forEach((schedule: Schedule) => {
      const {start, count} = schedule;
      Array(count).fill(null).map(() => schedule).forEach((schedule, i) => {
        this.hoursInDay[start + i] = schedule;
      });
    });
      this.schedules = [...this.hoursInDay];
  }

  private handleUpdate(intent) {
    const schedule: Schedule = {
      title: this.title, start: this.start.hour,
      count: Math.floor(this.end.hour - this.start.hour), end: this.end.hour,
      category: toCategory(this.date.year, this.date.month, this.date.day),
      year: this.date.year, month: this.date.month, day: this.date.day, $loki: this.id
    };
    this.title = '';

    if (intent === 'update') {
      return this.scheduleService.updateSchedule(schedule);
    }
    return this.scheduleService.deleteSchedule(schedule);
  }


  private handleCancel(reason) {
    console.log('cancel', reason);
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


}

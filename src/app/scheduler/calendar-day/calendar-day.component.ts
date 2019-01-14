import {Component, Input, OnInit} from '@angular/core';
import {Day, Schedule} from '../scheduler.types';
import {SchedulerService} from '../scheduler.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarService} from '../calendar/calendar.service';


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
  public date = {year: null, month: null, day: null};
  public month: Day[];
  public start = {hour: 10, minute: 0};
  public end = {hour: 11, minute: 0};
  public title = '';
  private id;

  constructor(
    private modalService: NgbModal,
    private scheduleService: SchedulerService,
    private calendarService: CalendarService
  ) {
  }

  ngOnInit() {
  }

  public renderDaysOfWeek(index) {
    if (index < 7) {
      return DAY_MAP[index];
    }
  }

  public openUpdateModal(content, schedule, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log(schedule);
    const {year, month, title, day, start, end, $loki} = schedule;
    this.date = {year, month, day};
    this.start.hour = start;
    this.start.minute = 0;
    this.end.hour = end;
    this.end.minute = 0;
    this.title = title;
    this.id = $loki;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
      .then((intent: 'delete' | 'update') => this.handleUpdate(intent))
      .then(() => this.calendarService.renderMonth())
      .catch((reason) => this.handleCancel(reason));
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


}

import {Component, Input, OnInit} from '@angular/core';
import {Day} from '../scheduler.types';

const DAY_MAP = {[0]: '일', [1]: '월', [2]: '화', [3]: '수', [4]: '목', [5]: '금', [6]: '토'};

@Component({
  selector: 'scheduler-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {

  @Input() day: Day;
  @Input() index: number;

  constructor() {
  }

  ngOnInit() {
  }

  public renderDaysOfWeek(index) {
    if (index < 7) {
      return DAY_MAP[index];
    }
  }

}

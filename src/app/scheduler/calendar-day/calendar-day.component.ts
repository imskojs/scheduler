import { Component, OnInit, Input } from '@angular/core';
import {Day} from '../scheduler.types';

@Component({
  selector: 'scheduler-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {

  @Input() day: Day;
  constructor() { }

  ngOnInit() {
  }

}

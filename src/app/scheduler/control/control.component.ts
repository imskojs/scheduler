import { Component, OnInit } from '@angular/core';
import { SimpleDateTime } from '../scheduler.types';
import { SchedulerService } from '../scheduler.service';
import { Observable } from 'rxjs';
import { ControlService } from './control.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'scheduler-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  selectedDateView$: Observable<string>;

  constructor(private controlService: ControlService) { }

  ngOnInit() {
    this.selectedDateView$ = this.controlService.getSelectedDate().pipe(
      map((date: SimpleDateTime) => `${date.year}년 ${date.day}월`)
    );
  }


}

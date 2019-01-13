import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CalendarMonthlyComponent} from './calendar-monthly.component';
import {Component, Input} from '@angular/core';
import {ControlService} from '../control/control.service';
import {SimpleDateTime} from '../scheduler.types';
import {of} from 'rxjs';
import {SchedulerService} from '../scheduler.service';

@Component({
  selector: 'scheduler-calendar-day',
  template: '',
})
class CalendarDayStubComponent {
  @Input() day: [];
  @Input() index: number;
}

describe('CalendarMonthlyComponent', () => {
  let controlService: jasmine.SpyObj<ControlService>;
  let component: CalendarMonthlyComponent;
  let fixture: ComponentFixture<CalendarMonthlyComponent>;

  beforeEach(async(() => {
    const controlServiceMock = jasmine.createSpyObj('ControlService', [
      'getSelectedDate'
    ]);
    const schedulerServiceMock = jasmine.createSpyObj('SchedulerService', [
      ''
    ]);
    TestBed.configureTestingModule({
      declarations: [
        CalendarMonthlyComponent,
        CalendarDayStubComponent
      ],
      providers: [
        {provide: ControlService, useValue: controlServiceMock},
        {provide: SchedulerService, useValue: schedulerServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    controlService = TestBed.get(ControlService);
    const currentDateStub: SimpleDateTime = {year: 2019, month: 1, day: 12, daysOfWeek: 6, hour: 8, minute: 27};
    controlService.getSelectedDate.and.returnValue(of(currentDateStub));
    fixture = TestBed.createComponent(CalendarMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

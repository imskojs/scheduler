import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { Component } from '@angular/core';
import { ControlService } from '../control/control.service';
import { of } from 'rxjs';
import { SimpleDateTime } from '../scheduler.types';

@Component({ selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }


describe('CalendarComponent', () => {
  let controlService: jasmine.SpyObj<ControlService>;
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    const calendarServiceMock = jasmine.createSpyObj('CalendarService', [
      'TODO'
    ]);
    const controlServiceMock = jasmine.createSpyObj('ControlService', [
      'getSelectedDate'
    ]);
    TestBed.configureTestingModule({
      declarations: [
        CalendarComponent,
        RouterOutletStubComponent
      ],
      providers: [
        { provide: CalendarService, useValue: calendarServiceMock },
        { provide: ControlService, useValue: controlServiceMock }
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    controlService = TestBed.get(ControlService);
    const currentDateStub: SimpleDateTime = {year: 2019, month: 1, day: 12, daysOfWeek: 6, hour: 8, minute: 27 };
    controlService.getSelectedDate.and.returnValue(of(currentDateStub));
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerComponent } from './scheduler.component';
import { Component } from '@angular/core';

@Component({selector: 'scheduler-calendar', template: ''})
class CalendarStubComponent {}

@Component({selector: 'scheduler-control', template: ''})
class ControlStubComponent {}

@Component({selector: 'app-welcome', template: ''})
class WelcomeStubComponent {}
describe('SchedulerComponent', () => {
  let component: SchedulerComponent;
  let fixture: ComponentFixture<SchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SchedulerComponent,
        CalendarStubComponent,
        ControlStubComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

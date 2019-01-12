import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlComponent } from './control.component';
import { SchedulerService } from '../scheduler.service';
import { SimpleDateTime } from '../scheduler.types';
import { ControlService } from './control.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ControlComponent', () => {
  let controlService: jasmine.SpyObj<ControlService>;
  let component: ControlComponent;
  let fixture: ComponentFixture<ControlComponent>;


  beforeEach(async(() => {
    const controlServiceStub = jasmine.createSpyObj('ControlService', [
      'getSelectedDate',
      'selectDate'
    ]);
    TestBed.configureTestingModule({
      declarations: [ ControlComponent ],
      providers: [{
        provide: ControlService,
        useValue: controlServiceStub
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    controlService = TestBed.get(ControlService);
    fixture = TestBed.createComponent(ControlComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call controlService#getSelectedDate on initialization ', () => {
    const dateStub: SimpleDateTime = {
      year: 2019, month: 1, day: 12, daysOfWeek: 'saturday', hour: 8, minute: 27
    };
    controlService.getSelectedDate.and.returnValue(of(dateStub));
    component.ngOnInit();
    expect(controlService.getSelectedDate.calls.count()).toBe(1);
  });

  it('should have selectedDateView initialized with a reference to current date', () => {
    const dateStub: SimpleDateTime = {
      year: 2019, month: 1, day: 12, daysOfWeek: 'saturday', hour: 8, minute: 27
    };
    controlService.getSelectedDate.and.returnValue(of(dateStub));
    fixture.detectChanges();
    const selectedDateView = fixture.debugElement.query(By.css('.selected-date'));
    const content = selectedDateView.nativeElement.textContent;
    expect(content).toContain('2019년 12월');
  });

});

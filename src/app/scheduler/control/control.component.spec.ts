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
      'selectDate',
      'getSelectedDateType',
      'selectDateType',
      'sendNextDateDirection',
      'getNextDate'
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
    const currentDateStub: SimpleDateTime = {year: 2019, month: 1, day: 12, daysOfWeek: 'saturday', hour: 8, minute: 27 };
    const nextDateStub: SimpleDateTime = {year: 2019, month: 2, day: 12, daysOfWeek: 'saturday', hour: 11, minute: 27 };
    controlService.getSelectedDate.and.returnValue(of(currentDateStub));
    controlService.getSelectedDateType.and.returnValue(of('month'));
    controlService.getNextDate.and.returnValue(of(nextDateStub));

    fixture = TestBed.createComponent(ControlComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call controlService#getSelectedDate and controlService#getSelectedDateType on initialization ', () => {
    component.ngOnInit();
    expect(controlService.getSelectedDate.calls.count()).toBe(1);
    expect(controlService.getSelectedDateType.calls.count()).toBe(1);
  });

  it('should have selectedDateView initialized with a reference to the most recent value from getSelectedDate', () => {
    fixture.detectChanges();
    const selectedDateView = fixture.debugElement.query(By.css('.selected-date'));
    const content = selectedDateView.nativeElement.textContent;
    expect(content).toContain('2019년 1월');

    component.selectedDateView$.subscribe((formatedDate: string) => {
      expect(formatedDate).toEqual('2019년 1월');
    });
  });

  it('should have selectedDateTypeView initialized with the most recent value returned from getSelectedDateType', () => {
    fixture.detectChanges();
    const monthDe = fixture.debugElement.query(By.css('.month'));
    const weekDe = fixture.debugElement.query(By.css('.week'));
    expect(monthDe.nativeElement.classList.contains('active')).toBe(true, 'contains active class');
    expect(weekDe.nativeElement.classList.contains('active')).toBe(false, 'not contain active class');
    controlService.getSelectedDateType.and.returnValue(of('week'));
    component.ngOnInit(); // force init the second time.
    fixture.detectChanges();
    expect(monthDe.nativeElement.classList.contains('active')).toBe(false, 'not contains active class');
    expect(weekDe.nativeElement.classList.contains('active')).toBe(true, 'contain active class');
  });

  it('should call controlService#selectDateType with correct DateType on click on month or week', () => {
    fixture.detectChanges();
    const monthDe = fixture.debugElement.query(By.css('.month'));
    const weekDe = fixture.debugElement.query(By.css('.week'));
    monthDe.triggerEventHandler('click', null);
    expect(controlService.selectDateType).toHaveBeenCalledWith('month');
    controlService.selectDateType.calls.reset();
    weekDe.triggerEventHandler('click', null);
    expect(controlService.selectDateType).toHaveBeenCalledWith('week');
  });

  it('should call controlService#sendNextDateDirection with correct Direction when prev or next is clicked', () => {
    fixture.detectChanges();
    const prevDe = fixture.debugElement.query(By.css('.prev'));
    const nextDe = fixture.debugElement.query(By.css('.next'));
    prevDe.triggerEventHandler('click', null);
    expect(controlService.sendNextDateDirection).toHaveBeenCalledWith('prev');
    controlService.sendNextDateDirection.calls.reset();
    nextDe.triggerEventHandler('click', null);
    expect(controlService.sendNextDateDirection).toHaveBeenCalledWith('next');
  });
















































});

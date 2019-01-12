import { TestBed } from '@angular/core/testing';

import { ControlService } from './control.service';
import { SchedulerService } from '../scheduler.service';
import { SimpleDateTime } from '../scheduler.types';
const {toSimpleDateTime} = SchedulerService;

describe('ControlService', () => {
  let service: ControlService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlService]
    });
    service = TestBed.get(ControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('#getSelectedDate method', () => {
    it('should return observable which emits SimpleDateTime on subscribe', () => {
      const selectedDate$ = service.getSelectedDate();
      const simpleDateTimeNow = toSimpleDateTime(Date.now());
      selectedDate$.subscribe((date: SimpleDateTime) => {
        expect(date).toEqual(simpleDateTimeNow);
      });
    });

    it('should return observable which emits the latest selected SimpleDateTime on subscribe', () => {
      const selectedDate$ = service.getSelectedDate();
      const simpleDateTime = toSimpleDateTime(1547249260794);
      const subscription = service.getSelectedDate().subscribe();
      service.selectDate(simpleDateTime);
      subscription.unsubscribe();
      service.getSelectedDate().subscribe((date: SimpleDateTime) => {
        expect(date).toEqual(simpleDateTime);
      });
    });
  });

  describe('#selectDate', () => {
    it('should emit passed in data to an observable created by #getSelectedDate method', () => {
      const selectedDate$ = service.getSelectedDate();
      const simpleDateTime = toSimpleDateTime(1547249260794);
      let latestSimpleDateTime: SimpleDateTime;
      service.getSelectedDate().subscribe((date: SimpleDateTime) => {
        latestSimpleDateTime = date;
      });
      service.selectDate(simpleDateTime);
      expect(latestSimpleDateTime).toEqual(simpleDateTime);
    });
  });

});

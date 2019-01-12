import { TestBed } from '@angular/core/testing';

import { ControlService } from './control.service';
import { SchedulerService } from '../scheduler.service';
import { SimpleDateTime, DateType } from '../scheduler.types';
const { toSimpleDateTime } = SchedulerService;

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

  describe('#getSelectedDateType method', () => {
    it('should return observable which initially emits month DateType on subscribe', () => {
      const selectedDateType$ = service.getSelectedDateType();
      selectedDateType$.subscribe((dateType: DateType) => {
        expect(dateType).toEqual('month');
      });
    });

    it('should return observable which emits the latest selected DateType on subscribe', () => {
      const subscription = service.getSelectedDateType().subscribe();
      service.selectDateType('week');
      subscription.unsubscribe();
      service.getSelectedDateType().subscribe((dateType: DateType) => {
        expect(dateType).toEqual('week');
      });
    });
  });

  describe('#selectDateType', () => {
    it('should emit DateType', () => {
      const emitedDateType: DateType = 'month';
      let receivedDateType: DateType;
      service.getSelectedDateType().subscribe((dateType: DateType) => {
        receivedDateType = dateType;
      });
      service.selectDateType(emitedDateType);
      expect(emitedDateType).toBe(receivedDateType);
    });
  });

  describe('#sendNextDateDirection, #getNextDate', () => {
    let year, month, day, hour, dateSub, dateTypeSub;
    beforeEach(() => {
      const baseTime = new Date(2019, 0, 20, 20, 20);
      jasmine.clock().mockDate(baseTime);
      const dateTimeNow = toSimpleDateTime(Date.now());
      year = dateTimeNow.year;
      month = dateTimeNow.month;
      day = dateTimeNow.day;
      hour = dateTimeNow.hour;
      dateSub = service.getSelectedDate().subscribe();
      dateTypeSub = service.getSelectedDateType().subscribe();
    });
    afterEach(() => {
      dateSub.unsubscribe();
      dateTypeSub.unsubscribe();
    });
    it('should increase next date by 1 month', () => {
      service.getNextDate().subscribe((dateTime: SimpleDateTime) => {
        expect(dateTime.month).toEqual(2);
      });
      service.sendNextDateDirection('next');
    });

    it('should decrease next date by 1 month', () => {
      service.getNextDate().subscribe((dateTime: SimpleDateTime) => {
        expect(dateTime.month).toEqual(12);
      });
      service.sendNextDateDirection('prev');
    });

    it('should increase next date by 1 week (7 days)', () => {
      service.selectDateType('week');
      service.getNextDate().subscribe((dateTime: SimpleDateTime) => {
        expect(dateTime.day).toEqual(27);
      });
      service.sendNextDateDirection('next');
    });

    it('should decrease next date by 1 week (7 days)', () => {
      service.selectDateType('week');
      service.getNextDate().subscribe((dateTime: SimpleDateTime) => {
        expect(dateTime.day).toEqual(13);
      });
      service.sendNextDateDirection('prev');
    });


  });

































});

import { TestBed } from '@angular/core/testing';

import { SchedulerService } from './scheduler.service';
import { SimpleDate, SimpleTime, SimpleDateTime } from './scheduler.types';

describe('SchedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [SchedulerService]
  }));

  it('should be created', () => {
    const service: SchedulerService = TestBed.get(SchedulerService);
    expect(service).toBeTruthy();
  });

  describe('#toSimpleDate static method', () => {
    it('should convert timestamp to SimpleDate', () => {
      const timestamp = 1547249260794;
      const simpleDate: SimpleDate = SchedulerService.toSimpleDate(timestamp);
      expect(simpleDate).toEqual({
        year: 2019,
        month: 1,
        day: 12,
        daysOfWeek: 'saturday'
      });
    });
  });

  describe('#toSimpleTime static method', () => {
    it('should convert timestamp to SimpleTime', () => {
      const timestamp = 1547249260794;
      const simpleTime: SimpleTime = SchedulerService.toSimpleTime(timestamp);
      expect(simpleTime).toEqual({ hour: 8, minute: 27 });
    });
  });

  describe('#toTimestamp static method', () => {
    it('should convert SimpleDateTime to timestamp', () => {
      const simpleDateTime: SimpleDateTime = {
        year: 2019,
        month: 1,
        day: 12,
        daysOfWeek: 'saturday',
        hour: 8,
        minute: 27
      };
      const timestamp = SchedulerService.toTimestamp(simpleDateTime);
      expect(timestamp).toEqual(1547249220000);

    });
  });

  describe('#toSimpleDateTime static method', () => {
    it('should convert timestamp to SimpleDateTime', () => {
      const timestamp = 1547249260794;
      const simpleDateTime: SimpleDateTime = SchedulerService.toSimpleDateTime(timestamp);
      expect(simpleDateTime).toEqual({
        year: 2019,
        month: 1,
        day: 12,
        daysOfWeek: 'saturday',
        hour: 8,
        minute: 27
      });
    });

  });

});


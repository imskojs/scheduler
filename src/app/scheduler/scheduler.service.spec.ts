import { TestBed } from '@angular/core/testing';

import { SchedulerService } from './scheduler.service';
import { SimpleDate, SimpleTime } from './scheduler.types';

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
      expect(simpleTime).toEqual({hour: 8, minute: 27 });
    });
  });

});


import { TestBed } from '@angular/core/testing';
import { SchedulerService } from './scheduler.service';
describe('SchedulerService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SchedulerService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=scheduler.service.spec.js.map
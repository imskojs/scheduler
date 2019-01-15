import { async, TestBed } from '@angular/core/testing';
import { CalendarWeeklyComponent } from './calendar-weekly.component';
describe('CalendarWeeklyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CalendarWeeklyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CalendarWeeklyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=calendar-weekly.component.spec.js.map
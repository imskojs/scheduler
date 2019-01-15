import { async, TestBed } from '@angular/core/testing';
import { CalendarMonthlyComponent } from './calendar-monthly.component';
describe('CalendarMonthlyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CalendarMonthlyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CalendarMonthlyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=calendar-monthly.component.spec.js.map
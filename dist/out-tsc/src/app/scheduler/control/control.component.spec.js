import { async, TestBed } from '@angular/core/testing';
import { ControlComponent } from './control.component';
describe('ControlComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ControlComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should have selectedDate initialized with current date', function () {
    });
    describe('#changeDate', function () {
        it('should');
    });
});
//# sourceMappingURL=control.component.spec.js.map
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { ControlComponent } from './control/control.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarMonthlyComponent } from './calendar-monthly/calendar-monthly.component';
import { CalendarWeeklyComponent } from './calendar-weekly/calendar-weekly.component';
import { ControlService } from './control/control.service';
import { CalendarService } from './calendar/calendar.service';
import { SchedulerService } from './scheduler.service';
var SchedulerModule = /** @class */ (function () {
    function SchedulerModule() {
    }
    SchedulerModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                SchedulerComponent,
                ControlComponent,
                CalendarComponent,
                CalendarMonthlyComponent,
                CalendarWeeklyComponent
            ],
            imports: [
                CommonModule,
                SchedulerRoutingModule
            ],
            exports: [
                SchedulerComponent
            ],
            providers: [
                SchedulerService,
                ControlService,
                CalendarService
            ]
        })
    ], SchedulerModule);
    return SchedulerModule;
}());
export { SchedulerModule };
//# sourceMappingURL=scheduler.module.js.map
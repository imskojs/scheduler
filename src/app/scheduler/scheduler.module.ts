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

@NgModule({
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
export class SchedulerModule { }

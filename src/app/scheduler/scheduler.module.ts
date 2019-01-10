import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { ControlComponent } from './control/control.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    SchedulerComponent,
    ControlComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    SchedulerRoutingModule
  ],
  exports: [
    SchedulerComponent
  ]
})
export class SchedulerModule { }

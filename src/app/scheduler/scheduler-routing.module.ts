import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarMonthlyComponent } from './calendar-monthly/calendar-monthly.component';
import { CalendarWeeklyComponent } from './calendar-weekly/calendar-weekly.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SchedulerComponent } from './scheduler.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
    children: [
      { path: '', redirectTo: 'calendar/month', pathMatch: 'full' },
      {
        path: 'calendar', component: CalendarComponent,
        children: [
          { path: '', redirectTo: 'month', pathMatch: 'full' },
          { path: 'month', component: CalendarMonthlyComponent },
          { path: 'week', component: CalendarWeeklyComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }

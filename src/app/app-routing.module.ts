import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { CalendarComponent } from './scheduler/calendar/calendar.component';
import { CalendarMonthlyComponent } from './scheduler/calendar-monthly/calendar-monthly.component';
import { CalendarWeeklyComponent } from './scheduler/calendar-weekly/calendar-weekly.component';

const routes: Routes = [
  { path: '', redirectTo: 'scheduler', pathMatch: 'full' },
  {
    path: 'scheduler', component: SchedulerComponent,
    children: [
      { path: '', redirectTo: 'calendar', pathMatch: 'full' },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

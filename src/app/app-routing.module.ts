import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulerModule } from './scheduler/scheduler.module';

const routes: Routes = [
  { path: '', redirectTo: 'scheduler', pathMatch: 'full' },
  { path: 'scheduler', loadChildren: () => SchedulerModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

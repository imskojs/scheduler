import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SchedulerModule} from './scheduler/scheduler.module';

const routes: Routes = [
  {path: '', redirectTo: 'scheduler', pathMatch: 'full'},
  {path: 'scheduler', loadChildren: () => SchedulerModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpcommingJoineesComponent } from './upcomming-joinees.component';
const routes: Routes = [
  {path: '', component: UpcommingJoineesComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpcommingJoineeRoutingModule { }
 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignationComponent } from './designation.component';
import { NewDesignationComponent } from './new-designation/new-designation.component';

const routes: Routes = [
  {path: '', component: DesignationComponent},
  {path: 'new', component:NewDesignationComponent},  
  {path: ':id/edit', component:NewDesignationComponent},  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationRoutingModule { }
 
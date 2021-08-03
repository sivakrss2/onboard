import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageDesignationComponent } from './manage-designation.component';
import { NewDepartmentDesignationComponent } from './new-department-designation/new-department-designation.component';

const routes: Routes = [
  {path: '', component: ManageDesignationComponent},
  {path: 'new', component:NewDepartmentDesignationComponent},  
  {path: ':id/edit', component:NewDepartmentDesignationComponent},  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDesignationRoutingModule { }
 

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAdministrationComponent } from './role-administration.component';
import { NewRoleComponent } from './new-role/new-role.component';

const routes: Routes = [
  {path: '', component: RoleAdministrationComponent},
  {path: 'new', component:NewRoleComponent},  
  {path: ':id/edit', component:NewRoleComponent},  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleAdministrationRoutingModule { }
 
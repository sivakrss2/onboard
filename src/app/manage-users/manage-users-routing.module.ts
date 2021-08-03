import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUsersComponent } from './manage-users.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  {path: '', component: ManageUsersComponent},
  {path: 'new', component:NewUserComponent},  
  {path: ':id/edit', component:NewUserComponent},  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
 
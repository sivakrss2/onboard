import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule as MkTabsModule, BoxModule} from 'angular-admin-lte';
import { NgModule } from '@angular/core';
import { RoleAdministrationRoutingModule } from './role-administration-routing.module';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import {MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material'
import {MatIconModule} from '@angular/material/icon';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AlertModule as MkAlertModule } from 'angular-admin-lte';
import { RoleAdministrationComponent } from './role-administration.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



declare var $;
@NgModule({
  declarations: [RoleAdministrationComponent, NewRoleComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    RoleAdministrationRoutingModule,
    DataTablesModule,
    BoxModule,
    MkTabsModule,  
    ReactiveFormsModule,
    NgSelectModule,
    BoxModule,
    MkTabsModule, 
    ReactiveFormsModule, 
    NgSelectModule,
    MatStepperModule, MatInputModule, MatButtonModule,MatIconModule,
    MkAlertModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class RoleAdministrationModule { }

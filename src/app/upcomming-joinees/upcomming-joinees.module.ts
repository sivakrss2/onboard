import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule as MkTabsModule, BoxModule} from 'angular-admin-lte';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import {MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material'
import {MatIconModule} from '@angular/material/icon';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AlertModule as MkAlertModule } from 'angular-admin-lte';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UpcommingJoineesComponent } from './upcomming-joinees.component';
import { UpcommingJoineeRoutingModule } from './upcomming-joinees-routing.module';

@NgModule({
  declarations: [UpcommingJoineesComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    DataTablesModule,
    UpcommingJoineeRoutingModule,
    BoxModule,
    MkTabsModule,  
    ReactiveFormsModule,
    NgSelectModule,
    BoxModule,
    MkTabsModule, 
    NgSelectModule,
    MatStepperModule, MatInputModule, MatButtonModule,MatIconModule,
    MkAlertModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class UpcommingJoineeModule { }

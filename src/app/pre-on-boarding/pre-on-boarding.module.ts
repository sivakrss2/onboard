import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule as MkTabsModule, BoxModule} from 'angular-admin-lte';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { PreOnBoardingRoutingModule } from './pre-on-boarding-routing.module';
import { JoineeListComponent } from './joinee-list/joinee-list.component';
import { NewJoineeComponent } from './new-joinee/new-joinee.component';
import { DataTablesModule } from 'angular-datatables';
import { MarketingAssessmentComponent } from './marketing-assessment/marketing-assessment.component';
import {MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material'
import {MatIconModule} from '@angular/material/icon';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TechinicalAssessmentComponent } from './techinical-assessment/techinical-assessment.component';
import { AlertModule as MkAlertModule } from 'angular-admin-lte';
import { TechinicalTaskComponent } from './new-joinee/techinical-task/techinical-task.component';
import { AddSynergyDetailsComponent } from './add-synergy-details/add-synergy-details.component';



declare var $;
@NgModule({
  declarations: [JoineeListComponent, NewJoineeComponent, MarketingAssessmentComponent, TechinicalAssessmentComponent, TechinicalTaskComponent, AddSynergyDetailsComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PreOnBoardingRoutingModule,
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
    MkAlertModule
  ]
})
export class PreOnBoardingModule { }

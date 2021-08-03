import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { JoineeRoutingModule } from './joinee-routing.module';
import { JoineeComponent } from './joinee/joinee.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FactSheetComponent } from './fact-sheet/fact-sheet.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { IdCardComponent } from './id-card/id-card.component';
import { TabsModule as MkTabsModule, BoxModule} from 'angular-admin-lte';
import {MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material'
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [JoineeComponent, FactSheetComponent, PersonalDetailsComponent, IdCardComponent],
  imports: [
    CommonModule,
    JoineeRoutingModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BoxModule,
    MkTabsModule, 
    ReactiveFormsModule, 
    NgSelectModule,
    MatStepperModule, MatInputModule, MatButtonModule,MatIconModule
  ]
})
export class JoineeModule { }

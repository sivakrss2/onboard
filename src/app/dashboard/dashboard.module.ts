import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BoxModule, BoxSmallModule as MkBoxSmallModule  } from 'angular-admin-lte';
import { HighchartsChartModule  } from 'highcharts-angular';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BoxModule,  
    MkBoxSmallModule,
    HighchartsChartModule
  ]
})
export class DashboardModule { }

import { JoineeListComponent } from './joinee-list/joinee-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewJoineeComponent } from './new-joinee/new-joinee.component';
import { MarketingAssessmentComponent } from './marketing-assessment/marketing-assessment.component';
import { TechinicalAssessmentComponent } from './techinical-assessment/techinical-assessment.component';
import { TechinicalTaskComponent } from './new-joinee/techinical-task/techinical-task.component';
import { AuthGuard } from '../services/auth-guard.service';
import { AddSynergyDetailsComponent } from './add-synergy-details/add-synergy-details.component';

const routes: Routes = [
  {path: '', component: JoineeListComponent},
  {path: 'new', component:NewJoineeComponent},  
  {path: 'marketing_assessment', component: MarketingAssessmentComponent},
  {path: 'id/marketing_assessment', component: MarketingAssessmentComponent},
  {path: 'techinical_assessment', component: TechinicalAssessmentComponent},
  {path: 'id/techinical_assessment', component: TechinicalAssessmentComponent},
  {path: ':id/add_synergy_details', component: AddSynergyDetailsComponent},
  {path: ':id/edit', component:NewJoineeComponent, canActivate: [AuthGuard]},
  {path: ':id/techinical_edit', component:TechinicalTaskComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class PreOnBoardingRoutingModule { }
 
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { adminLteConf } from "./admin-lte.conf";
import { AuthService } from "./services/auth.services";
import { JoineeService } from './services/joinee.services';
import { FactSheetService } from './services/factsheet.services';
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { HttpClientModule } from '@angular/common/http';

import { LayoutModule } from "angular-admin-lte";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

import { LoadingPageModule, MaterialBarModule } from "angular-loading-page";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedFolderComponent } from './shared-folder/shared-folder.component';
import { DesignationComponent } from './designation/designation.component';

import { LoaderService } from "./services/loader.services";
import { LoaderComponent } from './loader/loader.component';
import { AdminService } from "./services/admin.services";
import { AuthGuard } from "./services/auth-guard.service";
import { RouterModule } from "@angular/router";

import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { DataTablesModule } from "angular-datatables";
import { BnNgIdleService } from "bn-ng-idle";
import { ManageDesignationComponent } from './manage-designation/manage-designation.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    LayoutModule.forRoot(adminLteConf),
    LoadingPageModule,
    MaterialBarModule,
    HttpClientModule,
    RouterModule,
    DataTablesModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  declarations: [AppComponent, HomeComponent, SharedFolderComponent, LoaderComponent],
  providers: [AuthService, JoineeService,FactSheetService,LoaderService,AdminService, AuthGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
 
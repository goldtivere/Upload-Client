import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './account-management/account-management.component';
import {AppComponentsModule} from "../app-components/app-components.module";
import {CustomMaterialModule} from "../custom-material/custom-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {DashboardManagementComponent} from "../Dashboard-management/dashboard-management.component";
import {AuthenticationService} from "../auth-services/authentication.service";
import {DashboardService} from "../app-services/dashboard.service";
import {TaskService} from "../app-services/task-service";
import {DownloadService} from "../app-services/download-service";
import {UserService} from "../app-services/user.service";
import {ErrorService} from "../app-services/error.service";
import {AccountManagementService} from "../app-services/account-management-service";
import {ExportAsModule} from "ngx-export-as";



@NgModule({
  declarations: [AccountManagementComponent],
  exports: [AccountManagementComponent],
  providers: [AuthenticationService, AccountManagementService, ErrorService],
  entryComponents: [AccountManagementComponent],
  imports: [
    CommonModule,
    AppComponentsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    MatAutocompleteModule,
    ExportAsModule
  ]
})
export class AccountManagementModule { }

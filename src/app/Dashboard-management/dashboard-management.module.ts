import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppComponentsModule} from "../app-components/app-components.module";
import {CustomMaterialModule} from "../custom-material/custom-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatAutocompleteModule, MatTabsModule} from "@angular/material";
import {AuthenticationService} from "../auth-services/authentication.service";
import {TaskService} from "../app-services/task-service";
import {CompanyService} from "../app-services/company.service";
import {DownloadService} from "../app-services/download-service";
import {UserService} from "../app-services/user.service";
import {ErrorService} from "../app-services/error.service";
import { DashboardManagementComponent } from './dashboard-management.component';
import {DashboardService} from "../app-services/dashboard.service";

@NgModule({
  imports: [
    CommonModule,
    AppComponentsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    MatAutocompleteModule
  ],
  declarations: [DashboardManagementComponent],
  exports: [DashboardManagementComponent],
  providers: [AuthenticationService, DashboardService, TaskService, DownloadService, UserService, ErrorService],
  entryComponents: [DashboardManagementComponent]
})
export class DashboardManagementModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentManagementComponent } from './payment-management/payment-management.component';
import {AppComponentsModule} from "../../app-components/app-components.module";
import {CustomMaterialModule} from "../../custom-material/custom-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatAutocompleteModule, MatTabsModule} from "@angular/material";
import {DashboardManagementComponent} from "../../Dashboard-management/dashboard-management.component";
import {AuthenticationService} from "../../auth-services/authentication.service";
import {CompanyService} from "../../app-services/company.service";
import {TaskService} from "../../app-services/task-service";
import {DownloadService} from "../../app-services/download-service";
import {UserService} from "../../app-services/user.service";
import {ErrorService} from "../../app-services/error.service";
import {DashboardService} from "../../app-services/dashboard.service";
import {WindowComponent} from "./payment-management/window.component";
import {PortalModule} from '@angular/cdk/portal';



@NgModule({
  imports: [
    CommonModule,
    AppComponentsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    MatAutocompleteModule,
    PortalModule
  ],
  declarations: [PaymentManagementComponent,WindowComponent],
  exports: [PaymentManagementComponent],
  providers: [AuthenticationService, DashboardService, TaskService, DownloadService, UserService, ErrorService],
  entryComponents: [PaymentManagementComponent]
})
export class PaymentManagementModule { }

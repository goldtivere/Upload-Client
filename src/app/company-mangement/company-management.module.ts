import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppComponentsModule} from "../app-components/app-components.module";
import {CustomMaterialModule} from "../custom-material/custom-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatAutocompleteModule, MatSlideToggleModule, MatTabsModule} from "@angular/material";
import {AuthenticationService} from "../auth-services/authentication.service";
import {TaskService} from "../app-services/task-service";
import {CompanyService} from "../app-services/company.service";
import {DownloadService} from "../app-services/download-service";
import {UserService} from "../app-services/user.service";
import {ErrorService} from "../app-services/error.service";
import {CompanyManagementComponent} from "./company-management/company-management.component";
import { CompanyUsersComponent } from './company-users/company-users.component';

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
    MatSlideToggleModule
  ],
  declarations: [CompanyManagementComponent, CompanyUsersComponent],
  exports: [CompanyManagementComponent],
  providers: [AuthenticationService, CompanyService, TaskService, DownloadService, UserService, ErrorService],
  entryComponents: [CompanyManagementComponent]
})
export class CompanyManagementModule {
}

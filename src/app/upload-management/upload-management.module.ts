import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../auth-services/authentication.service';
import {AppComponentsModule} from '../app-components/app-components.module';
import {UploadManagementComponent} from './upload-management/upload-management.component';
import {UserService} from '../app-services/user.service';
import {RouterModule} from '@angular/router';
import {MatAutocompleteModule, MatTabsModule} from '@angular/material';
import {ErrorService} from '../app-services/error.service';
import {UploadService} from '../app-services/upload-service';
import {TaskService} from '../app-services/task-service';
import {DownloadService} from '../app-services/download-service';
import {TokenDialogComponent} from '../dialog/token-dialog/token-dialog.component';

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
  declarations: [UploadManagementComponent],
  exports: [UploadManagementComponent],
  providers: [AuthenticationService, UploadService, TaskService, DownloadService, UserService, ErrorService],
  entryComponents: [UploadManagementComponent, TokenDialogComponent]
})
export class UploadModule {
}

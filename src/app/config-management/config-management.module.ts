import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../auth-services/authentication.service';
import {AppComponentsModule} from '../app-components/app-components.module';
import {TableService} from '../app-services/table-service';
import {UserService} from '../app-services/user.service';
import {ConfigDetailsComponent} from './config-management/config-details.component';
import {UploadService} from '../app-services/upload-service';
import {RouterModule} from '@angular/router';
import {MatAutocompleteModule, MatRadioModule, MatTabsModule} from '@angular/material';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ExcelService} from '../app-services/excel-service';
import {ErrorService} from '../app-services/error.service';
import {ConnectionService} from '../app-services/connection-service';
import {AccountService} from '../app-services/account-service';
import {TaskService} from '../app-services/task-service';
import {ScheduleService} from '../app-services/schedule-service';

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
    BsDatepickerModule,
    MatRadioModule
  ],
  declarations: [ConfigDetailsComponent],
  exports: [ConfigDetailsComponent],
  providers: [AuthenticationService, TableService, UserService, ScheduleService, UploadService,
    ConnectionService, AccountService, TaskService, ExcelService, ErrorService],
  entryComponents: [ConfigDetailsComponent]
})
export class ConfigModule {
}

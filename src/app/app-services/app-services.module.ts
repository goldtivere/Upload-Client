import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from './user.service';
import {TableService} from './table-service';
import {ConnectionService} from './connection-service';
import {UploadService} from './upload-service';
import {ScheduleService} from './schedule-service';
import {AccountService} from './account-service';
import {ErrorService} from './error.service';
import {DownloadService} from "./download-service";
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    UserService,
    TableService,
    ConnectionService,
    DownloadService,
    UploadService,
    ScheduleService,
    AccountService,
    ErrorService
  ]
})
export class AppServicesModule { }

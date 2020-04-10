import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatDialogModule} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './auth-services/http-interceptor.service';
import {UserManagementModule} from './user-management/user-management.module';
import {AuthComponentsModule} from './app-components/auth-components/auth-components.module';
import {AppComponentsModule} from './app-components/app-components.module';
import {AppServicesModule} from './app-services/app-services.module';
import {AuthServicesModule} from './auth-services/auth-services.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UploadModule} from './upload-management/upload-management.module';
import {ConfigModule} from './config-management/config-management.module';
import {CustomMaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {DialogModule} from './dialog/dialog.module';
import {CompanyManagementModule} from "./company-mangement/company-management.module";
import {DashboardManagementModule} from "./Dashboard-management/dashboard-management.module";
import {PaymentManagementModule} from "./payment-management/payment-management/payment-management.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    AuthServicesModule,
    BrowserAnimationsModule,
    AppServicesModule,
    AppComponentsModule,
    AuthComponentsModule,
    UserManagementModule,
    CompanyManagementModule,
    UploadModule,
    ConfigModule,
    DialogModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardManagementModule,
    PaymentManagementModule,
    MatRadioModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    MatDialogModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

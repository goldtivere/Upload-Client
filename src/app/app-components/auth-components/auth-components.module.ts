import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {CustomMaterialModule} from '../../custom-material/custom-material.module';
import {ErrorService} from '../../app-services/error.service';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FormsModule,
    RouterModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LoginPageComponent,
    SignUpComponent
  ],
  exports: [
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LoginPageComponent

  ],
  providers: [ErrorService],
  entryComponents: [ForgotPasswordComponent]
})
export class AuthComponentsModule { }

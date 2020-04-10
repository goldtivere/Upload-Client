import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationService } from './authentication.service';
import { LoggedInGuard } from './logged-in.guard';
import { NotLoggedInGuard } from './not-logged-in.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthenticationService,
    LoggedInGuard,
    NotLoggedInGuard
  ]
})
export class AuthServicesModule { }

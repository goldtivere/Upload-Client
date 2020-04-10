import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserManagementComponent} from './user-management/user-management.component';
import {UserService} from '../app-services/user.service';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../auth-services/authentication.service';
import {AppComponentsModule} from '../app-components/app-components.module';
import {RouterModule} from '@angular/router';
import {MatAutocompleteModule} from '@angular/material';
import {ErrorService} from '../app-services/error.service';

@NgModule({
  imports: [
    CommonModule,
    AppComponentsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatAutocompleteModule
  ],
  declarations: [UserManagementComponent],
  exports: [UserManagementComponent],
  providers: [UserService, AuthenticationService, ErrorService],
  entryComponents: [UserManagementComponent]
})
export class UserManagementModule {
}

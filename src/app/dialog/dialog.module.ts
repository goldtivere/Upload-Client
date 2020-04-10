import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../auth-services/authentication.service';
import {AppComponentsModule} from '../app-components/app-components.module';
import {RouterModule} from '@angular/router';
import {MatAutocompleteModule, MatDialogModule, MatRadioModule, MatTabsModule} from '@angular/material';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ErrorService} from '../app-services/error.service';
import {TokenDialogComponent} from './token-dialog/token-dialog.component';

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
    MatRadioModule,
    MatDialogModule
  ],
  declarations: [TokenDialogComponent],
  exports: [TokenDialogComponent],
  providers: [AuthenticationService, ErrorService],
  entryComponents: [TokenDialogComponent]
})
export class DialogModule {
}

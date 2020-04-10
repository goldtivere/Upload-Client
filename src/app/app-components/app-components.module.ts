import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule
} from '@angular/material';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {FormsModule} from '@angular/forms';
import {AuthComponentsModule} from './auth-components/auth-components.module';
import {UserManagementModule} from '../user-management/user-management.module';
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    CustomMaterialModule,
    FormsModule,
    AuthComponentsModule
  ],
  declarations: [
    LoaderComponent
  ],

  exports: [
    LoaderComponent,
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class AppComponentsModule {
}

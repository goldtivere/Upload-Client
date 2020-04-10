import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ErrorStateMatcher,
  MAT_DIALOG_DEFAULT_OPTIONS, MAT_SNACK_BAR_DATA,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSnackBarModule, MatStepperIntl, MatStepperModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule, ShowOnDirtyErrorStateMatcher,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';


@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    CdkTableModule,
    MatDividerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatStepperModule,
  ],
  exports: [
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    CdkTableModule,
    MatDividerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatStepperModule,

  ],
  declarations: [],

  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: MAT_SNACK_BAR_DATA, useValue: {duration: 2500}},
    MatStepperIntl
  ]
})
export class CustomMaterialModule {
}

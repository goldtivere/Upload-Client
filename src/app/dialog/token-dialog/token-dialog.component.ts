import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-token-dialog',
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.css']
})
export class TokenDialogComponent implements OnInit {

  form: FormGroup;
  token: string;
  error: string;
  task: string;
  processing = false;

  constructor(private httpClient: HttpClient,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TokenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.task = data.task;
  }

  ngOnInit() {
    this.form = this.fb.group({
      token: ['', Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  validate() {
    this.error = null;
    const token = this.form.value['token'];
    if (!token) {
      this.error = 'Please enter token!';
      return;
    }
    this.processing = true;
    this.httpClient.post<any>(`${environment.apiBaseUrl}/token/${token}/validate`, {})
      .pipe().subscribe((response: any) => {
        this.processing = false;
        if (response.authenticationSuccessful) {
          this.dialogRef.close(this.task);
        } else {
          this.error = response.respMessage;
        }

    }, error => {
        this.processing = false;
        this.error = 'Unable to validate token!';
    });
  }
}

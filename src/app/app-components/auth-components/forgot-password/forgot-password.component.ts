import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../auth-services/authentication.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from '../../../app-services/error.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  email: string;
  emailControl: AbstractControl;
  working: boolean;

  errorMessage: string;
  successMessage: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    public bsModalRef: BsModalRef, private errorService: ErrorService) {
    this.working = false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      'email': [this.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ])]
    });
    this.emailControl = this.form.controls['email'];
  }

  cancel() {
    this.bsModalRef.hide();
  }

  submit() {
    if (this.working || this.form.invalid) {
      return;
    }
    this.errorMessage = null;
    this.working = true;
    const email = this.form.get('email').value;
    this.authenticationService.requestPasswordReset({
      email
    }).subscribe((payload) => {
      this.working = false;
      // console.log(payload);
      this.bsModalRef.hide();
    }, (error: HttpErrorResponse) => {
      this.working = false;
      console.log(error);
      this.errorMessage = this.errorService.getErrorMessage(error);
      // console.log(this.errorMessage);
    });
  }

}

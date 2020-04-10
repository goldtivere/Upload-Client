import { Component, OnInit } from '@angular/core';
import {
  Response
} from '@angular/http';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../auth-services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  password: AbstractControl;
  password2: AbstractControl;
  loading: boolean;

  error: string;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.loading = false;
    this.form = fb.group({
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      'password2': ['', Validators.compose([Validators.required, this.passwordsMatch()])]
    });
    this.password = this.form.controls['password'];
    this.password2 = this.form.controls['password2'];
  }

  ngOnInit() {
  }

  passwordsMatch() {
    const self = this;
    return (control: AbstractControl) => {
      if (!self.form) {
        return null;
      }

      const password = this.form.controls['password'].value;
      if (!password) {
        return null;
      }
      return control.value !== password ? { confirm: true } : null;
    };
  }

  submit(): void {
    // console.log('submit');
    if (this.loading || this.form.invalid) {
      return;
    }
    this.loading = true;
    const newPassword = this.password.value;
    this.authenticationService.changePassword(newPassword)
      .subscribe((user: any) => {
        this.loading = false;
        this.router.navigate(['/']);
      }, (res: Response) => {
        this.error = res.statusText;
        this.loading = false;
      });
  }
}

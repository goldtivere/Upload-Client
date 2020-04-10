import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { map, distinctUntilChanged } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private routeObserver: any;

  form: FormGroup;
  password: AbstractControl;
  working: boolean;
  token: boolean;

  errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.form = fb.group({
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      'password2': ['', Validators.compose([Validators.required, this.passwordsMatch()])]
    });
    this.password = this.form.controls['password'];
    this.password.valueChanges.subscribe(() => {
      this.form.controls['password2'].updateValueAndValidity();
    });
    this.routeObserver = this.activatedRoute.params
      .pipe(map(params => {
        return params['token'];
      }, distinctUntilChanged()))
      .subscribe(token => {
        this.token = token;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routeObserver.unsubscribe();
  }

  submit(): void {
    // console.log('submit');
    if (this.working || this.form.invalid) {
      return;
    }
    this.working = true;
    const value = {
      resetToken: this.token,
      password: this.password.value
    };
    console.log('reseting password...');
    this.authenticationService.resetPassword(value)
      .subscribe((user: any) => {
        this.working = false;
        const url = this.authenticationService.getLastProtectedUrl();
        if (url) {
          this.router.navigateByUrl(url);
          this.authenticationService.clearLastProtectedUrl();
        } else {
          this.router.navigate(['/']);
        }
      }, (res: HttpErrorResponse) => {
        this.working = false;
        try {
          // if (res.status === 400) {
          //   const body = res.json();
          //   if (body.fieldErrors && body.fieldErrors.email) {
          //     const emailErrors: any[] = body.fieldErrors.email;
          //     const uniqueUsernameErrors: any[] = emailErrors.filter((val: any) => val.code === 'KnownEmail');
          //     if (uniqueUsernameErrors.length) {
          //       // this.error = `No account matches ${value.email}`;
          //       return;
          //     }
          //   }
          // }
        } catch (error) {
          // console.error(error);
        }
        this.errorMessage = (res.status === 401 || res.status === 403) ? 'Invalid token' : res.statusText;
      });
  }

  isInvalid(field: string): boolean {
    const control: AbstractControl = this.form.controls[field];
    return control.touched && control.invalid;
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
      return control.value !== password ? { match: true } : null;
    };
  }

}

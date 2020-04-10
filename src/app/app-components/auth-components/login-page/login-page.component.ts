import {Component, OnInit, ViewChild} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../auth-services/authentication.service';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {UserService} from '../../../app-services/user.service';
import {ModalOptions} from 'ngx-bootstrap';
import {HttpInterceptorService} from '../../../auth-services/http-interceptor.service';
import {ErrorService} from '../../../app-services/error.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  resetPasswordForm: FormGroup;
  form: FormGroup;
  phone: AbstractControl;
  password: AbstractControl;
  loading: boolean;
  bsModalRef: BsModalRef;
  error: string;
  success: string;
  email: string;
  modalOptions = new ModalOptions();

  @ViewChild('resetPasswordModal', {static: true}) resetPasswordModal: any;
  constructor(fb: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private modalService: BsModalService,
              private userService: UserService, private errorService: ErrorService) {
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.loading = false;
    this.form = fb.group({
      'phone': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.resetPasswordForm = fb.group({
      'phone': ['', Validators.required]
    });
    this.phone = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  openModalWithComponent(): void {
    const initialState = {
      email: this.form.get('username').value
    };
    const modalOptions = new ModalOptions();
    modalOptions.backdrop = 'static';
    modalOptions.keyboard = false;
    modalOptions.initialState = initialState;
    this.bsModalRef = this.modalService.show(ForgotPasswordComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  submitX(): void {
    if (this.loading || this.form.invalid) {
      return;
    }
    this.loading = true;
    this.error = null;
    const value = this.form.value;
    this.authenticationService.login({
      phone: value['username'].trim(),
      password: value['password']
    })
      .subscribe((user: any) => {
        this.authenticationService.fetch().subscribe(response => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        });
      }, (res: Response) => {
      console.log(res);
        if (res.status === 401 || res.status === 400) {
          this.error = 'Username or Password incorrect';
        } else if (res.status < 1) {
          this.error = 'Failed to contact server. Please check your internet connection';
        } else {
          this.error = 'An error occured. Please try again';
        }
        this.loading = false;
      });
  }

  submit(): void {
    if (this.loading || this.form.invalid) {
      return;
    }
    this.loading = true;
    this.error = null;
    const value = this.form.value;
    this.authenticationService.login({
      phone: value['phone'].trim(),
      password: value['password']
    }).subscribe((response: any) => {
        localStorage.setItem(HttpInterceptorService.TOKEN_NAME, response.token);
        this.authenticationService.fetch().subscribe(res => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        }, err => {
          this.loading = false;
        });
      }, (res: Response) => {
        console.log(res);
        if (res.status === 401 || res.status === 400) {
          this.error = 'Username or Password incorrect';
        } else if (res.status < 1) {
          this.error = 'Failed to contact server. Please check your internet connection';
        } else {
          this.error = 'An error occurred. Please try again';
        }
        this.loading = false;
      });
      if (this.isLoginPage() && this.authenticationService.sessionUser) {
        this.router.navigate(['/dashboard']);
      }
  }

  openResetPasswordModal() {
    this.error = null;
    this.success = null;
    this.email = null;
    this.bsModalRef = this.modalService.show(this.resetPasswordModal, this.modalOptions);
  }

  resetPassword() {
    this.error = null;
    this.success = null;
    if (this.loading || this.resetPasswordForm.invalid) {
      this.error = 'Please input the email!'
      return;
    }
    this.loading=true;
    this.userService.forgotPassword(this.resetPasswordForm.value['phone']).pipe().
        subscribe(res => {
          this.loading=false;
          this.success = 'Password has been reset. Please check your Phone for SMS!';
    }, error => {
          this.loading=false;
          this.error = this.errorService.getErrorMessage(error);
    });
  }

  isLoginPage() {
    return this.router.url === '/login';
  }

  getLogo() {
    return environment.production ? '/collections/assets/vendor/images/piggy_.png' : '/assets/vendor/images/piggy_.png';
  }
}

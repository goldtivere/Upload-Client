import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../auth-services/authentication.service";
import {UserService} from "../../../app-services/user.service";
import {ErrorService} from "../../../app-services/error.service";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {HttpInterceptorService} from "../../../auth-services/http-interceptor.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
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
    this.resetPasswordForm = fb.group({
      'email': ['', Validators.required]
    });
    this.form = fb.group({
      'phone': ['', Validators.required],
      'passCode': ['', Validators.required],
      'password': ['', Validators.required],
      'confirmpassword': ['', Validators.required]
    });

    this.phone = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
    this.authenticationService.logout();
  }


  isLoginPage() {
    return this.router.url === '/login';
  }

  getLogo() {
    return environment.production ? '/collections/assets/vendor/images/piggy_.png' : '/assets/vendor/images/piggy_.png';
  }
  login(): void {
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
        this.router.navigate(['/home']);
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
  }
  createPassword() {
    if (this.loading || this.form.invalid) {
      this.error = 'Please fill the form correctly!';
      return;
    }
    this.loading = true;
    this.error = null;
    this.success = null;
    const value = this.form.value;
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d^a-zA-Z0-9].{6,}$/.test(value['password'])) {

      if (value['password'] !== value['confirmpassword']) {
        this.error = 'Password and confirm password must be thesame';
        this.loading = false;
      }
      else {
        this.userService.createPassword({
          phone: value['phone'].trim(),
          password: value['password'],
          passcode: value['passCode']
        }).subscribe((response: any) => {
          this.loading = false;
          if (response.status === 401 || response.status === 403) {
            this.error = 'Phone or Passcode incorrect';
          } else {
            this.success = 'Password has been created. Redirecting to dashboard...';
            setTimeout(() => {
              this.login();
            }, 3000);
          }

        }, (res: Response) => {
          console.log(res);
          if (res.status === 401 || res.status === 403) {
            this.error = 'Phone or Passcode incorrect';
          } else if (res.status === 422) {
            this.error = 'Password ';
          } else if (res.status < 1) {
            this.error = 'Failed to contact server. Please check your internet connection';
          } else {
            this.error = 'An error occurred. Please try again';
          }
          this.loading = false;
        });
      }
      this.loading = false;
    } else {
      this.error = 'Password length should be 6 minimum and contains at least one uppercase, ' +
        'one lowercase and one digit';
      this.loading = false;
    }
  }
}

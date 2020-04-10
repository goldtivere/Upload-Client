import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthenticationService} from './auth-services/authentication.service';
import {isUndefined} from 'util';
import {Utils} from './utils/model/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {UserService} from './app-services/user.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {environment} from '../environments/environment';
import {RoleType} from './utils/model/role-type.enum';
import {ErrorService} from "./app-services/error.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions = new Array<Subscription>();
  loading = false;
  user: any;
  roleTypes = RoleType;
  error: string;
  success: string;
  bsModalRef: BsModalRef;
  snackBarConfig = new MatSnackBarConfig();
  passwordForm: FormGroup;
  authenticationService: AuthenticationService
  modalOptions = new ModalOptions();
  @ViewChild('passwordModal', {static: true}) passwordModal: any;
  constructor(private fb: FormBuilder, private router: Router,
              private snackBar: MatSnackBar,
              private modalService: BsModalService,
              private authService: AuthenticationService,
              private userService: UserService,
              private errorService: ErrorService) {

    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.passwordForm = fb.group({
      'newPassword': ['', Validators.required],
      'previousPassword': ['', Validators.required],
      'confirmPassword':['',Validators.required]
    });
    this.snackBarConfig.duration = 3000;
    this.authenticationService = authService;
  }

  pageUtils = new Utils();

  ngOnInit(): void {

    this.subscriptions.push(this.router.events.subscribe((event: any) => {
      if (event instanceof RouteConfigLoadStart
        || event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd
        || event instanceof NavigationCancel
        || event instanceof NavigationError) {
        this.loading = false;
      }
      if (event instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
      if (event instanceof NavigationError) {
        // console.log(event);
      }
    }));

    const userSub = this.authenticationService.getUser();

    userSub.subscribe(user => {
      this.user = user;
    });
  }

  isUserInitialized() {
    return !isUndefined(this.user);
  }

  isLoginPage() {
    return this.router.url === '/login';
  }

  logout() {
    this.authenticationService.logout().subscribe(
      () => {
        this.router.navigate(['/login']);
      }
    );
  }
  openModal(): void {
    this.bsModalRef = this.modalService.show(this.passwordModal, this.modalOptions);
  }
  changePassword() {
    this.error = null;
    this.success = null;

    if (this.loading || !this.passwordForm.valid) {
      this.error = 'Please fill in the form correctly to continue.';
      return;
    }
    this.loading=true;
    const value = this.passwordForm.value;

    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(this.passwordForm.value['newPassword'])) {
      if (value['newPassword'] !== value['confirmPassword']) {
        this.error = 'Password and confirm password must be the same';
        this.loading = false;
      }else{
      this.userService.changePassword({
        previousPassword: value['previousPassword'],
        newPassword: value['newPassword']
      }).pipe()
        .subscribe((response) => {
          this.loading = false;
          this.snackBar.open(`Password has been changed!`, null, this.snackBarConfig);
          this.bsModalRef.hide();
          this.logout();
        }, error => {
          if (error.status == 403) {
            this.loading = false;
            this.error = 'Please ensure you input correct password';
          } else {
            this.loading = false;
            this.error = this.errorService.getErrorMessage(error);
          }
          this.loading = false;
          this.snackBar.open(this.error, null, this.snackBarConfig);
        });
    }
    } else {
      this.loading=false;
      this.error = 'Password length should be 8 minimum and contains at least one uppercase, ' +
        'one lowercase and one digit';
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(it => it.unsubscribe());
  }

  getLogo() {
    return environment.production ? '/collections/assets/vendor/images/piggy_.png' : '/assets/vendor/images/piggy_.png';
  }
}

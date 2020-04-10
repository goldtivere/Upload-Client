import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig, PageEvent} from '@angular/material';
import {UserService} from '../../app-services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {PageData} from '../../utils/model/page-data';
import {UserQueryModel} from '../../utils/model/user-query-model';
import {AuthenticationService} from '../../auth-services/authentication.service';
import {SelectOptions} from '../../utils/model/select-options';
import {RoleType} from '../../utils/model/role-type.enum';
import {ErrorService} from '../../app-services/error.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  userForm: FormGroup;
  passwordForm: FormGroup;
  userData: PageData;
  pageParams: Params;
  pageQueryModel: UserQueryModel =  new UserQueryModel();
  pageLoading = true;
  makingSearchCall = false;
  searchCallQueue = false;
  bsModalRef: BsModalRef;
  error: string;
  success: string;
  user: any;
  roleTypes = RoleType;
  selectOptions = new SelectOptions();
  snackBarConfig = new MatSnackBarConfig();
  editedUser: any;
  editUserForm: FormGroup;
  authenticationService: AuthenticationService;
  modalOptions = new ModalOptions();

  @ViewChild('userModal', {static: true}) userModal: any;
  @ViewChild('editUserModal', {static: true}) editUserModal: any;
  @ViewChild('modal', {static: true}) modal: any;
  constructor(private router: Router, private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private modalService: BsModalService,
              private authService: AuthenticationService,
              private userService: UserService, private errorService: ErrorService) {
    this.authenticationService = authService;

    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;

    this.userForm = fb.group({
      'email': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'roleName': ['', Validators.required],
      'address': [''],
      'phoneNumber': ['', Validators.required],
      'otherNames': ['']
    });

    this.editUserForm = fb.group({
      'email': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'address': [''],
      'phoneNumber': ['', Validators.required],
      'otherNames': ['']
    });

    this.passwordForm = fb.group({
      'newPassword': ['', Validators.required],
      'previousPassword': ['', Validators.required]
    });
    this.snackBarConfig.duration = 3000;
  }

  ngOnInit() {
    this.getSubscription();
  }

  getPageParamsAndUserData() {
    this.activatedRoute.queryParams.subscribe(response => {
      this.pageParams = response;
      this.pageQueryModel.page = this.pageParams['page'];
      this.pageQueryModel.pageSize = this.pageParams['limit'];
      this.getUsers();
    });
  }

  createUser() {
    this.error = null;
    this.success = null;

    if (!this.userForm.valid) {
      this.error = 'Please fill in the form correctly to continue.';
      return;
    }
    this.userService.createUser(this.userForm.value).pipe()
      .subscribe((response) => {
        this.snackBar.open(`User has been created!`, null, this.snackBarConfig);
        this.bsModalRef.hide();
        this.getUsers();
      }, error => {
        this.error = this.errorService.getErrorMessage(error);
        this.snackBar.open(this.error, null, this.snackBarConfig);
      });
  }

  getUsers() {
    if (this.makingSearchCall) {
      this.searchCallQueue = true;
      return;
    }
    this.makingSearchCall = true;
    this.searchCallQueue = false;
    this.userService.getUsers(this.pageQueryModel).subscribe((response: any) => {
      this.userData = response;
      this.pageLoading = false;
      this.makingSearchCall = false;
      if (this.searchCallQueue) {
        this.getUsers();
      }
    }, error => {
      this.makingSearchCall = false;
      this.pageLoading = false;
    });
  }

  editUser() {
    this.error = null;
    this.success = null;
    if (!this.editedUser) {
      this.error = 'No user was selected for edit';
      return;
    } else if (!this.editUserForm.valid) {
      this.error = 'Please fill in the form correctly to continue.';
      return;
    }
    this.userService.editUser(this.editedUser.id, this.editUserForm.value).pipe()
      .subscribe((response) => {
        this.snackBar.open(`User has been edited!`, null, this.snackBarConfig);
        this.bsModalRef.hide();
        this.getUsers();
      }, error => {
        this.error = this.errorService.getErrorMessage(error);
        this.snackBar.open(this.error, null, this.snackBarConfig);
      });
  }

  resetPassword(email: string) {
    this.userService.resetPassword(email).subscribe((response: any) => {
      this.snackBar.open('Passwords has been reset', null, this.snackBarConfig);
    }, error => {
      this.error = this.errorService.getErrorMessage(error);
      this.snackBar.open(this.error, null, this.snackBarConfig);
    });
  }

  dataChange() {
    this.getUsers();
  }

  getSubscription() {
    this.authenticationService.getUser().subscribe(
      (user) => {
        this.user = user;
        this.getPageParamsAndUserData();
      }
    );
  }

  openUserEditModal(user: any) {
    this.editedUser = user;
    this.editUserForm.patchValue(user);
    this.bsModalRef = this.modalService.show(this.editUserModal, this.modalOptions);
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageQueryModel.pageSize = pageEvent.pageSize;
    this.pageQueryModel.page = pageEvent.pageIndex;
    this.getUsers();
  }

  canShowTable() {
    return (this.userData && this.userData.totalElements > 0) && !this.pageLoading;
  }

  canShowNoData() {
    return (!this.userData || this.userData.totalElements == 0) && !this.pageLoading;
  }

  openUserModal(): void {
    this.bsModalRef = this.modalService.show(this.userModal, this.modalOptions);
  }
}

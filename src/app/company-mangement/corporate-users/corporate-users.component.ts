import {Component, OnInit, ViewChild} from '@angular/core';
import {PageData} from "../../utils/model/page-data";
import {SelectOptions} from "../../utils/model/select-options";
import {AuthenticationService} from "../../auth-services/authentication.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanyUserQueryModel} from "../../utils/model/company-user-query-model";
import {ActivatedRoute, Params} from "@angular/router";
import {RoleType} from "../../utils/model/role-type.enum";
import {CompanyService} from "../../app-services/company.service";
import {ErrorService} from "../../app-services/error.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-corporate-users',
  templateUrl: './corporate-users.component.html',
  styleUrls: ['./corporate-users.component.css']
})

export class CorporateUsersComponent implements OnInit {
  static anotherThis;
  companyUserData: PageData;
  companyName: any;
  pageLoading = true;
  companyId:number;
  selectOptions = new SelectOptions();
  authenticationService: AuthenticationService;
  bsModalRef: BsModalRef;
  modalOptions = new ModalOptions();
  companyUserForm: FormGroup;
  editCompanyUserForm: FormGroup;
  pageQueryModel: CompanyUserQueryModel = new CompanyUserQueryModel();
  error: string;
  value: string;
  snackBarConfig = new MatSnackBarConfig();
  success: string;
  user: any;
  pageParams: Params;
  roleTypes = RoleType;
  loading: boolean;

  @ViewChild('companyUserModal', {static: false}) companyUserModal: any;
  @ViewChild('editCompanyUserModal', {static: false}) editCompanyUserModal: any;
  constructor(private fb: FormBuilder, private modalService: BsModalService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private authService: AuthenticationService,
              private companyService: CompanyService,
              private errorService: ErrorService) {
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.snackBarConfig.duration = 3000;
    this.authenticationService = authService;
    this.companyUserForm = fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
      'email': ['', Validators.required],
      'roleType': ['', Validators.required]
    });

    this.editCompanyUserForm = fb.group({
      'id':['',Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
      'email': ['', Validators.required],
      'roleType': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getSubscription();
    CorporateUsersComponent.anotherThis = this;
  }
  getSubscription() {
    this.authenticationService.getUser().subscribe(
      (user) => {
        this.user = user;
        this.getPageParamsAndCompanyUserData();
        this.getCompanyUsers();
      }
    );
  }
  getPageParamsAndCompanyUserData() {
      this.companyService.getCorporateCmpanyName().pipe().subscribe((response:any)=>{
        this.companyName=response.name;
      });
  }
  canShowTable() {
    return (this.companyUserData && this.companyUserData.totalElements > 0) && !this.companyUserData;
  }
  openUserModal(): void {
    this.bsModalRef = this.modalService.show(this.companyUserModal, this.modalOptions);
  }

  getCompanyUsers()
  {
    this.companyService.getCorporateCompanyUsers(this.pageQueryModel).pipe().subscribe((response: any) => {
      this.companyUserData = response;
      this.pageLoading = false
    });
  }
  onPageChange(pageEvent: PageEvent) {
    this.pageQueryModel.pageSize = pageEvent.pageSize;
    this.pageQueryModel.page = pageEvent.pageIndex;
    this.getCompanyUsers();
  }
  canShowNoData() {
    return (!this.companyUserData || this.companyUserData.totalElements == 0) && !this.pageLoading;
  }

  createCompanyUsers() {
    this.error = null;
    this.success = null;
    if (this.loading || !this.companyUserForm.valid) {
      this.error = 'Please fill in the form correctly to continue.';
      return;
    }
    this.loading = true;
    this.companyService.createCorporateCompanyUser(this.companyUserForm.value).pipe()
      .subscribe((response) => {
        this.loading=false;
        this.snackBar.open(`Company User has been created!`, null, this.snackBarConfig);
        this.bsModalRef.hide();
        this.getSubscription();
      }, error => {
        this.loading=false;
        this.error = this.errorService.getErrorMessage(error);
        this.snackBar.open(this.error, null, this.snackBarConfig);
      });
  }
  dataChange() {
    this.getCompanyUsers();
  }
  editCompUserModal(companyUser: any)
  {
    this.error = null;
    this.success = null;
    const companyEdit = new CompanyEditUser(companyUser);
    this.editCompanyUserForm.patchValue(companyEdit);
    this.bsModalRef = this.modalService.show(this.editCompanyUserModal, this.modalOptions);
  }
  editCompanyUser()
  {
    this.error = null;
    this.success = null;
    if (this.loading || !this.editCompanyUserForm.valid) {
      this.error = 'Please ensure all required fields are captured.';
      return;
    }
    this.loading=true;
    const formValue = this.editCompanyUserForm.value;
    this.companyService.editCorporateCompanyUser(formValue).pipe()
      .subscribe((response) => {
        this.loading=false;
        this.snackBar.open(`Company User has been updated!`, null, this.snackBarConfig);
        this.bsModalRef.hide();
        this.getSubscription();
      }, error => {
        this.loading=false;
        this.error = this.errorService.getErrorMessage(error);
        this.snackBar.open(this.error, null, this.snackBarConfig);
      });
  }
  switchStatus(companyUsers: any)
  {
    this.companyService.setUserStatus(companyUsers.id).pipe()
      .subscribe((response) => {
        this.snackBar.open(`User is ` + (companyUsers.userStatus ? 'Enabled' : 'Disabled'), null, this.snackBarConfig);
      }, error => {
        this.snackBar.open(this.errorService.getErrorMessage(error), null, this.snackBarConfig);
        this.getCompanyUsers();
      });
  }
}

class CompanyEditUser {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public roleType:string;

  constructor(company: any) {
    this.id = company.user.id;
    this.firstName = company.user.firstName;
    this.lastName = company.user.lastName;
    this.email = company.user.email;
    this.phoneNumber = company.user.phoneNumber;
    this.roleType=company.user.role.name;
  }
}

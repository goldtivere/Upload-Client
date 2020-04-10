import {Component, OnInit, ViewChild} from '@angular/core';
import {PageData} from "../../utils/model/page-data";
import {AuthenticationService} from "../../auth-services/authentication.service";
import {ActivatedRoute, Params} from "@angular/router";
import {UploadQueryModel} from "../../utils/model/upload-query-model";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap";
import {RoleType} from "../../utils/model/role-type.enum";
import {SelectOptions} from "../../utils/model/select-options";
import {MatDialog, MatSnackBar, MatSnackBarConfig, PageEvent} from "@angular/material";
import {Utils} from "../../utils/model/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../app-services/task-service";
import {DownloadService} from "../../app-services/download-service";
import {UploadService} from "../../app-services/upload-service";
import {ErrorService} from "../../app-services/error.service";
import {CompanyService} from "../../app-services/company.service";

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {
  static anotherThis;
  companyData: PageData;
  authenticationService: AuthenticationService;
  pageParams: Params;
  pageQueryModel: UploadQueryModel = new UploadQueryModel();
  pageLoading = true;
  makingSearchCall = false;
  searchCallQueue = false;
  bsModalRef: BsModalRef;
  error: string;
  value: string;
  isAccountValid=false;
  companyForm: FormGroup;
  editCompanyForm: FormGroup;
  success: string;
  user: any;
  bankList: any;
  roleTypes = RoleType;
  selectOptions = new SelectOptions();
  snackBarConfig = new MatSnackBarConfig();
  pageUtils = new Utils();
  modalOptions = new ModalOptions();
  loading:boolean;

  @ViewChild('companyModal', {static: false}) companyModal: any;
  @ViewChild('editCompanyModal', {static: false}) editCompanyModal: any;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private taskService: TaskService,
    private downloadService: DownloadService,
    private companyService: CompanyService, private errorService: ErrorService
  ) {
    this.authenticationService = authService;
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.snackBarConfig.duration = 3000;
    this.companyForm = fb.group({
      'licenceNumber': ['', Validators.required],
      'name': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
      'email': ['', Validators.required],
      'address': ['', Validators.required],
      'bank': ['', Validators.required],
      'accountnumber': ['', Validators.required],
      'accountName': ['', Validators.required]
    });

    this.editCompanyForm = fb.group({
      'id':['',Validators.required],
      'licenceNumber': ['', Validators.required],
      'name': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
      'email': ['', Validators.required],
      'address': ['', Validators.required],
      'bankid': ['', Validators.required],
      'accountnumber': ['', Validators.required],
      'accountName': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getSubscription();
    CompanyManagementComponent.anotherThis = this;
  }

  getSubscription() {
    this.authenticationService.getUser().subscribe(
      (user) => {
        this.user = user;
        this.getPageParamsAndTablesData();
        this.getBanks();
      }
    );
  }

  getBanks() {
    this.companyService.getAllBanks().subscribe((response: any) => {
      this.bankList = response;
    }, error => {
      this.makingSearchCall = false;
      this.pageLoading = false;
    });
  }

  canShowTable() {
    return (this.companyData && this.companyData.totalElements > 0) && !this.pageLoading;
  }

  getPageParamsAndTablesData() {
    this.activatedRoute.queryParams.subscribe(response => {
      this.pageParams = response;
      this.pageQueryModel.page = this.pageParams['page'];
      this.pageQueryModel.pageSize = this.pageParams['limit'];
      this.getCompanies();
    });
  }

  getCompanies() {
    if (this.makingSearchCall) {
      this.searchCallQueue = true;
      return;
    }
    this.makingSearchCall = true;
    this.searchCallQueue = false;
    this.companyService.getCompanies(this.pageQueryModel).subscribe((response: any) => {
      this.companyData = response;
      this.pageLoading = false;
      this.makingSearchCall = false;
      if (this.searchCallQueue) {
        this.getCompanies();
      }
    }, error => {
      this.makingSearchCall = false;
      this.pageLoading = false;
    });
  }

  canShowNoData() {
    return (!this.companyData || this.companyData.totalElements == 0) && !this.pageLoading;
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageQueryModel.pageSize = pageEvent.pageSize;
    this.pageQueryModel.page = pageEvent.pageIndex;
    this.getCompanies();
  }

  openUserModal(): void {
    this.bsModalRef = this.modalService.show(this.companyModal, this.modalOptions);
  }
  createCompany()
  {
    this.error = null;
    this.success = null;
    if (this.loading || !this.companyForm.valid) {
      this.error = 'Please fill in the form correctly to continue.';
      return;
    }
    this.loading=true;
    this.companyService.createCompany(this.companyForm.value).pipe()
      .subscribe((response) => {
        this.loading=false;
        this.snackBar.open(`Company has been created!`, null, this.snackBarConfig);
        this.bsModalRef.hide();
        this.getSubscription();
      }, error => {
this.loading=false;
        if(error.status==500)
        {
          this.error = 'Account Number is invalid!!';
          this.snackBar.open(this.error, null, this.snackBarConfig);
        }else {
          this.error = this.errorService.getErrorMessage(error);
          this.snackBar.open(this.error, null, this.snackBarConfig);
        }
      });
  }
  dataChange() {
    this.getCompanies();
  }
  editCompany()
  {
    this.error = null;
    this.success = null;
    if (this.loading || !this.editCompanyForm.valid) {
      this.error = 'Please ensure all required fields are captured.';
      return;
    }
    this.loading=true;
    const formValue = this.editCompanyForm.value;
    this.companyService.editCompany(formValue['bankid'],formValue).pipe()
    .subscribe((response) => {
      this.loading=false;
      this.snackBar.open(`Company has been updated!`, null, this.snackBarConfig);
      this.bsModalRef.hide();
      this.getSubscription();
    }, error => {
      this.loading=false;
        this.error = this.errorService.getErrorMessage(error);
        this.snackBar.open(this.error, null, this.snackBarConfig);
    });
  }
  editCompModal(company: any)
  {
    this.error = null;
    this.success = null;
    const companyEdit = new CompanyEdit(company);
    this.editCompanyForm.patchValue(companyEdit);
    this.bsModalRef = this.modalService.show(this.editCompanyModal, this.modalOptions);
  }

}
class CompanyEdit {
  public id:number;
  public licenceNumber:string;
  public name:string;
  public phoneNumber: string;
  public email:string;
  public address: string;
  public bankid:string;
  public accountnumber: string;
  public accountName:string;
  constructor(company: any) {
    this.id=company.id;
    this.licenceNumber = company.licenceNumber;
    this.name=company.name;
    this.phoneNumber=company.phoneNumber;
    this.email=company.email;
    this.address=company.address;
    this.bankid=company.bank.id;
    this.accountnumber=company.accountnumber;
    this.accountName=company.accountName;
  }
}

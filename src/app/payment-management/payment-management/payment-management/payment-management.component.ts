import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../../auth-services/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap";
import {ActivatedRoute, Params} from "@angular/router";
import {CompanyService} from "../../../app-services/company.service";
import {ErrorService} from "../../../app-services/error.service";
import {PaymentService} from "../../../app-services/payment.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {RoleType} from "../../../utils/model/role-type.enum";
import {PageData} from "../../../utils/model/page-data";
import {UploadQueryModel} from "../../../utils/model/upload-query-model";
import {GetDebit} from "../../../utils/model/get-debit";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.css']
})
export class PaymentManagementComponent implements OnInit {

  authenticationService: AuthenticationService;
  user: any;
  debitData: PageData;
  confirmPayerId: FormGroup;
  confirmPAccountForm: FormGroup;
  bsModalRef: BsModalRef;
  modalOptions = new ModalOptions();
  snackBarConfig = new MatSnackBarConfig();
  success: string;
  pageLoading=false;
  userIdAccount:string;
  error: string;
  value: string;
  pageParams: Params;
  pageQueryModel: GetDebit = new GetDebit();
  roleTypes = RoleType;
  loading: boolean;
  isPaccountActive: boolean;
  paccountDetails:any;
  makingSearchCall = false;
  searchCallQueue = false;

  @ViewChild('confirmPayAccountModal', {static: false}) confirmPayAccountModal: any;
  constructor(private fb: FormBuilder, private modalService: BsModalService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private authService: AuthenticationService,
              private paymentService: PaymentService,
              private errorService: ErrorService
  ) {
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.snackBarConfig.duration = 3000;
    this.authenticationService = authService;
    this.confirmPayerId = fb.group({
      'autenticator': ['', Validators.required],
      'token': ['', Validators.required],
      'description': ['', Validators.required],
      'userwalletId': [''],
      'amount': ['', Validators.required]
    });

    this.confirmPAccountForm = fb.group({
      'paccount': ['', Validators.required]
    });

  }
  getPageParamsAndTablesData() {
    this.activatedRoute.queryParams.subscribe(response => {
      this.pageParams = response;
      this.pageQueryModel.page = this.pageParams['page'];
      this.pageQueryModel.pageSize = this.pageParams['limit'];
      this.getDebit();
    });
  }
  getDebit() {
    if (this.makingSearchCall) {
      this.searchCallQueue = true;
      return;
    }
    this.makingSearchCall = true;
    this.searchCallQueue = false;
    this.paymentService.getDebitList(this.pageQueryModel).subscribe((response: any) => {
      this.debitData = response;
      this.pageLoading = false;
      this.makingSearchCall = false;
    }, error => {
      this.makingSearchCall = false;
      this.pageLoading = false;
    });
  }
  ngOnInit() {
    this.getSubscription();
    this.getPageParamsAndTablesData()
  }
  getSubscription() {
    this.authenticationService.getUser().subscribe(
      (user) => {
        this.user = user;
      }
    );
  }
  makePayment()
  {
    this.error = null;
    this.success = null;
    if (this.loading || !this.confirmPayerId.valid) {
      this.error = 'Please fill in the form correctly to continue.';
      return;
    }
    this.loading=true;
    const formValue = this.confirmPayerId.value;
    formValue['userwalletId']=this.userIdAccount;
    this.paymentService.initiateDebit(formValue).pipe()
      .subscribe((response) => {
        this.loading=false;
        this.snackBar.open(response.message, null, this.snackBarConfig);
        this.bsModalRef.hide();
        this.isPaccountActive=false;
        this.getDebit();
        this.getSubscription();
      }, error => {
        this.loading=false;
        this.error = this.errorService.getErrorMessage(error);
        this.snackBar.open(this.error, null, this.snackBarConfig);
      });

  }
  canShowNoData() {
    return (!this.debitData || this.debitData.totalElements == 0) && !this.pageLoading;
  }
  canShowTable() {
    return (this.debitData && this.debitData.totalElements > 0) && !this.pageLoading;
  }
  onPageChange(pageEvent: PageEvent) {
    this.pageQueryModel.pageSize = pageEvent.pageSize;
    this.pageQueryModel.page = pageEvent.pageIndex;
    this.getDebit();
  }
confirmPaccount()
{
  const formValue = this.confirmPAccountForm.value;
  this.loading=true;
  this.paymentService.confirmPaccount(formValue['paccount']).pipe().subscribe((response: any) => {
    this.paccountDetails=response;
    this.userIdAccount=formValue['paccount'];
      this.snackBar.open(`PAccount Exists!`, null, this.snackBarConfig);
      this.bsModalRef.hide();
      this.isPaccountActive=true;

    this.loading = false
  }, error => {

      this.error = this.errorService.getErrorMessage(error);
      this.snackBar.open(this.error, null, this.snackBarConfig);

  });
}
  confirmPaymentModal()
  {
    this.error = null;
    this.success = null;
    this.bsModalRef = this.modalService.show(this.confirmPayAccountModal, this.modalOptions);
  }
}

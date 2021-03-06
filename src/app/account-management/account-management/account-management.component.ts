import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../auth-services/authentication.service";
import {ErrorService} from "../../app-services/error.service";
import {PaymentService} from "../../app-services/payment.service";
import {RoleType} from "../../utils/model/role-type.enum";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AccountManagementService} from "../../app-services/account-management-service";
import {AccountManagementModel} from "../../utils/model/account-management.model";
import {ActivatedRoute, Params} from "@angular/router";
import {PageData} from "../../utils/model/page-data";
import {PageEvent} from "@angular/material/paginator";
import {DownloadService} from "../../app-services/download-service";
import {ExportAsConfig, ExportAsService} from "ngx-export-as";
import {AccountReportModel} from "../../utils/model/account-report.model";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'tab', // the id of html/table element
  }
  authenticationService: AuthenticationService;
  user: any;
  roleTypes = RoleType;
  loading=false;
  charge: any;
  answer: string;
  makingSearchCall = false;
  searchCallQueue = false;
  pageParams: Params;
  pageParamsDebit: Params;
  pageQueryModel: AccountManagementModel= new AccountManagementModel();
  pageQueryModelReport: AccountReportModel= new AccountReportModel();
  balances:any;
  amount: number;
  companyUsers: any;
  companyTransactions:PageData;
  companyTransactionsDebit:PageData;
  pageLoading = true;
  trxnData:any[];
  trxnDataDebit:any[];
  bsModalRef: BsModalRef;
  modalOptions = new ModalOptions();
  snackBarConfig = new MatSnackBarConfig();
  error: string;
  success: string;
  @ViewChild('confirmModal', {static: true}) confirmModal: any;
  constructor(private authService: AuthenticationService,
              private errorService: ErrorService,
              private exportAsService: ExportAsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private modalService: BsModalService,
              private activatedRoute: ActivatedRoute,
              private downloadService: DownloadService,
              private accountManagement: AccountManagementService) {
    this.authenticationService = authService;
    this.snackBarConfig.duration = 3000;
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
  }

  ngOnInit() {
    console.log("hello dude");
    this.getSubscription();
  }

  getSubscription() {
    this.authenticationService.getUser().subscribe(
      (user) => {
        this.user = user;
        this.getPageParamsAndTablesData();
        this.getAccountBalance();
        this.getCompanyTransaction();
        this.getCompanyTransactionDebit();
        this.getCompanyUsers();
        this.getCorporateCharge();
      }
    );
  }
  getPageParamsAndTablesData() {
    this.activatedRoute.queryParams.subscribe(response => {
      this.pageParams = response;
      this.pageParamsDebit = response;
      this.pageQueryModel.page = this.pageParams['page'];
      this.pageQueryModel.pageSize = this.pageParams['limit'];
      this.pageQueryModelReport.page= this.pageParamsDebit['page'];
      this.pageQueryModelReport.pageSize= this.pageParamsDebit['limit'];
    });
  }
  getAccountBalance()
  {
    this.accountManagement.getAccountBalance().subscribe((response:any)=>{
      this.balances=response;
    });
  }
  getCorporateCharge()
  {
    this.accountManagement.getCorporateCharge().subscribe((response:any)=>{
      this.charge=response.message;
    });
  }
  getCompanyUsers()
  {
    this.accountManagement.getCompanyUsers().subscribe((response:any)=>{
      this.companyUsers=response;
    });
  }

  getCompanyTransaction()
  {
    if (this.makingSearchCall) {
      this.searchCallQueue = true;
      return;
    }
    this.makingSearchCall = true;
    this.searchCallQueue = false;
    this.accountManagement.getCompanyTransactions(this.pageQueryModel).subscribe((response: any) => {
      this.companyTransactions = response;
      this.pageLoading = false;
      this.makingSearchCall = false;
      if (this.searchCallQueue) {
        this.getCompanyTransaction();
      }
    }, error => {
      this.makingSearchCall = false;
      this.pageLoading = false;
    });
  }
  getCompanyTransactionDebit()
  {
    this.makingSearchCall = true;
    this.searchCallQueue = false;
    this.accountManagement.getCompanyTransactionsDebit(this.pageQueryModelReport).subscribe((response: any) => {
      this.companyTransactionsDebit = response;
      this.pageLoading = false;
      this.makingSearchCall = false;
      if (this.searchCallQueue) {
        this.getCompanyTransactionDebit();
      }
    }, error => {
      this.makingSearchCall = false;
      this.pageLoading = false;
    });
  }
  dataChange(){
    this.getCompanyTransaction();
  }
  dataChangeReport(){
    this.getCompanyTransactionDebit();
  }
  getPaymentReport(type: any) {
    this.accountManagement.getTrxnReport(this.pageQueryModel).subscribe((response: any) => {
      this.trxnData = response;
      setTimeout(() => {
        // this.exportAsService.save(this.exportAsConfig, 'My File Name').subscribe(() => {
        //   this.snackBar.open('Successful', null, this.snackBarConfig);
        // });
        this.downloadService.exportAs(type,'Report');
       this.snackBar.open('Successful', null, this.snackBarConfig);
      }, 2000);
    }, error => {
      this.snackBar.open('An error occurred during download', null, this.snackBarConfig);
    });

  }

  getPaymentReportDebit(type: any) {
    this.accountManagement.getTrxnReportDebit(this.pageQueryModelReport).subscribe((response: any) => {
      this.trxnDataDebit = response;
      setTimeout(() => {
        // this.exportAsService.save(this.exportAsConfig, 'My File Name').subscribe(() => {
        //   this.snackBar.open('Successful', null, this.snackBarConfig);
        // });
        this.downloadService.exportAsDebit(type,'Debit_Report');
        this.snackBar.open('Successful', null, this.snackBarConfig);
      }, 2000);
    }, error => {
      this.snackBar.open('An error occurred during download', null, this.snackBarConfig);
    });

  }

  canShowNoData() {
    return (!this.companyTransactions || this.companyTransactions.totalElements == 0) && !this.pageLoading;
  }
  canShowNoDataDebit() {
    return (!this.companyTransactionsDebit || this.companyTransactionsDebit.totalElements == 0) && !this.pageLoading;
  }
  canShowTable() {
    return (this.companyTransactions && this.companyTransactions.totalElements > 0) && !this.pageLoading;
  }
  canShowTableDebit() {
    return (this.companyTransactionsDebit && this.companyTransactionsDebit.totalElements > 0) && !this.pageLoading;
  }
  onPageChange(pageEvent: PageEvent) {
    this.pageQueryModel.pageSize = pageEvent.pageSize;
    this.pageQueryModel.page = pageEvent.pageIndex;
    this.getCompanyTransaction();
  }
  onPageChangeDebit(pageEvent: PageEvent) {
    this.pageQueryModelReport.pageSize = pageEvent.pageSize;
    this.pageQueryModelReport.page = pageEvent.pageIndex;
    this.getCompanyTransactionDebit();
  }
  openModal() {
    this.bsModalRef = this.modalService.show(this.confirmModal, this.modalOptions);
  }
  sendWithdrawal(){
    this.error = null;
    this.success = null;
    if (!this.answer || !this.amount) {
      this.error = 'Please fill in the form correctly to continue.';
      return;
    }

    if(this.charge*1+this.amount*1 > this.balances.availableBalance*1)
    {
      this.error = 'Amount Exceeds Available Balance plus charge!!';
      return;
    }
    this.loading=true;
    this.accountManagement.withdraw({
      amount: this.amount,
      answer: this.answer.trim()
    }).pipe()
      .subscribe((response) => {
        this.loading=false;
        this.snackBar.open(response.message, null, this.snackBarConfig);
        this.bsModalRef.hide();
        this.amount=null;
        this.answer=null;
        this.getAccountBalance();
        this.getCompanyTransactionDebit();
      }, error => {
        this.loading=false;
        this.error = this.errorService.getErrorMessage(error);
        this.snackBar.open(this.error, null, this.snackBarConfig);
      });


  }
}

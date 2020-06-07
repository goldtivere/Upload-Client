import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../auth-services/authentication.service";
import {ErrorService} from "../app-services/error.service";
import {PaymentService} from "../app-services/payment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap";
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {UserService} from "../app-services/user.service";

@Component({
  selector: 'app-dashboard-management',
  templateUrl: './dashboard-management.component.html',
  styleUrls: ['./dashboard-management.component.css']
})
export class DashboardManagementComponent implements OnInit {
  authenticationService: AuthenticationService;
  transactionList: any;
  user: any;
  error: string;
  success: string;
  loading = false;
  secretForm: FormGroup;
  snackBarConfig = new MatSnackBarConfig();
  modalOptions = new ModalOptions();
  bsModalRef: BsModalRef;
  @ViewChild('secretQuestionModal', {static: true}) secretQuestionModal: any;

  constructor(private authService: AuthenticationService,
              private errorService: ErrorService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private modalService: BsModalService,
              private paymentService: PaymentService) {
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.authenticationService = authService;
    this.secretForm = fb.group({
      'question': ['', Validators.required],
      'answer': ['', Validators.required],
      'confirmAnswer': ['', Validators.required]
    });
    this.snackBarConfig.duration = 3000;
    this.authenticationService = authService;
  }

  ngOnInit() {
    console.log("hello dude");
    this.getSubscription();
  }

  trxnSummary() {
    this.paymentService.transactionSummary().subscribe((response: any) => {
      this.transactionList = response;
    });
  }

  getSubscription() {
    console.log('sup duddd');
    this.authenticationService.getUser().subscribe(
      (user) => {
        this.user = user;
        this.userService.getSecretStatus().pipe().subscribe((response: any) => {
          if (response.status === true) {
            this.bsModalRef = this.modalService.show(this.secretQuestionModal, this.modalOptions);
          } else {
            this.bsModalRef.hide();
          }
        });
        this.trxnSummary();
      }
    );
  }

  setSecretQuestion() {
    this.error = null;
    this.success = null;
    if (this.loading || !this.secretForm.valid) {
      this.error = 'Please fill in the form correctly to continue.';
      return;
    }
    const value = this.secretForm.value;
    if(value.confirmAnswer !== value.answer)
    {
      this.error = 'Answer and Confirm Answer doesnt match';
      return;
    }
    this.loading = true;
    delete value.confirmAnswer;
    this.userService.setSecretQuestion(this.secretForm.value).pipe()
      .subscribe((response) => {
        this.loading=false;
        if(response.status ===true)
        {
          this.secretForm.reset();
        }
        this.snackBar.open(response.message, null, this.snackBarConfig);
        this.bsModalRef.hide();
        this.getSubscription();
      }, error => {
        this.loading=false;
        this.error = this.errorService.getErrorMessage(error);
        this.snackBar.open(this.error, null, this.snackBarConfig);
      });
  }
}

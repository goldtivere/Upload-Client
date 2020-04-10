import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../../auth-services/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "../../../app-services/company.service";
import {ErrorService} from "../../../app-services/error.service";
import {PaymentService} from "../../../app-services/payment.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {RoleType} from "../../../utils/model/role-type.enum";

@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.css']
})
export class PaymentManagementComponent implements OnInit {

  authenticationService: AuthenticationService;
  user: any;
  confirmPayerId: FormGroup;
  confirmPAccountForm: FormGroup;
  bsModalRef: BsModalRef;
  modalOptions = new ModalOptions();
  snackBarConfig = new MatSnackBarConfig();
  success: string;
  error: string;
  value: string;
  roleTypes = RoleType;
  loading: boolean;
  isPaccountActive: boolean;
  paccountDetails:any;

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
      'description': ['', Validators.required],
      'receiverId':['',Validators.required],
      'amount': ['', Validators.required]
    });

    this.confirmPAccountForm = fb.group({
      'paccount': ['', Validators.required]
    });

  }

  ngOnInit() {
    this.getSubscription();
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

  }
confirmPaccount()
{
  const formValue = this.confirmPAccountForm.value;
  this.loading=true;
  this.paymentService.confirmPaccount(formValue['paccount']).pipe().subscribe((response: any) => {
    this.paccountDetails=response;
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

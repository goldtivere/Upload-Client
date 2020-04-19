import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../auth-services/authentication.service";
import {ErrorService} from "../app-services/error.service";
import {PaymentService} from "../app-services/payment.service";

@Component({
  selector: 'app-dashboard-management',
  templateUrl: './dashboard-management.component.html',
  styleUrls: ['./dashboard-management.component.css']
})
export class DashboardManagementComponent implements OnInit {
  authenticationService: AuthenticationService;
  transactionList:any;
  user: any;
  constructor(private authService: AuthenticationService,
    private errorService: ErrorService,
    private paymentService: PaymentService) {
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
        this.trxnSummary();
      }
    );
  }
}

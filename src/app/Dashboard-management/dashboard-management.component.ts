import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../auth-services/authentication.service";

@Component({
  selector: 'app-dashboard-management',
  templateUrl: './dashboard-management.component.html',
  styleUrls: ['./dashboard-management.component.css']
})
export class DashboardManagementComponent implements OnInit {
  authenticationService: AuthenticationService;
  user: any;
  constructor(
    private authService: AuthenticationService,
  ) {
    this.authenticationService = authService;
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
}

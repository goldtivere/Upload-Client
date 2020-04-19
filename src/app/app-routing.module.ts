import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './app-components/auth-components/login-page/login-page.component';
import {LoggedInGuard} from './auth-services/logged-in.guard';
import {UserManagementComponent} from './user-management/user-management/user-management.component';
import {ConfigDetailsComponent} from './config-management/config-management/config-details.component';
import {CompanyManagementComponent} from "./company-mangement/company-management/company-management.component";
import {CompanyUsersComponent} from "./company-mangement/company-users/company-users.component";
import {SignUpComponent} from "./app-components/auth-components/sign-up/sign-up.component";
import {DashboardManagementComponent} from "./Dashboard-management/dashboard-management.component";
import {PaymentManagementComponent} from "./payment-management/payment-management/payment-management/payment-management.component";
import {AccountManagementComponent} from "./account-management/account-management/account-management.component";

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'password', component: SignUpComponent},
  { path: 'home', component: CompanyManagementComponent, canActivate: [LoggedInGuard]},
  { path: 'home/:companyId/companyusers', component: CompanyUsersComponent, canActivate: [LoggedInGuard]},
  { path: 'payments', component: PaymentManagementComponent, canActivate: [LoggedInGuard]},
  { path: 'admin/users/list', component: UserManagementComponent, canActivate: [LoggedInGuard]},
  { path: 'admin/config', component: ConfigDetailsComponent, canActivate: [LoggedInGuard]},
  { path : 'dashboard', component : DashboardManagementComponent, canActivate: [LoggedInGuard]},
  { path : 'account', component : AccountManagementComponent, canActivate: [LoggedInGuard]},
  { path : '', component : DashboardManagementComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

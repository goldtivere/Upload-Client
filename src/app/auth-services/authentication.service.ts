import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AsyncSubject, BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {isUndefined} from 'util';
import {HttpInterceptorService} from './http-interceptor.service';
import {of} from 'rxjs/observable/of';
import {Router} from '@angular/router';
import {RoleType} from "../utils/model/role-type.enum";

@Injectable()
export class AuthenticationService {

  private static user: Subject<any> = new BehaviorSubject(undefined);
  private static _user: Object;
  private static permissions: string[] = [];
  private static ongoingFetch: Observable<any>;
  private static initialized: boolean;
  public sessionUser: any;

  constructor(private httpClient: HttpClient, private router: Router) {

    AuthenticationService.user.subscribe((user: any) => {
      if (isUndefined(user)) {
        return;
      }
      AuthenticationService.initialized = true;
      AuthenticationService._user = user;
      this.sessionUser = user;
    });
    const token = localStorage.getItem(HttpInterceptorService.TOKEN_NAME);
    if (!token) {
      AuthenticationService.user.next(null);
      this.sessionUser = null;
      return;
    }
    this.fetch().subscribe((res => {

    }), (res => {

    }));
  }

  loadPermissions() {
    AuthenticationService.permissions = [];
    if (AuthenticationService._user) {
      AuthenticationService._user['role']['tasks'].forEach(task => {
        AuthenticationService.permissions.push(task['name']);
      });
    }
  }

  getLastProtectedUrl(): string {
    return null;
  }

  clearLastProtectedUrl() { }

  requestMailVerificationToken(): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/request-verification-mail`, {});
  }

  requestPasswordResetToken(email: string): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/password-reset-request`, { email });
  }

  logout() {
    localStorage.removeItem(HttpInterceptorService.TOKEN_NAME);
    this.sessionUser = null;
    AuthenticationService.user.next(null);
    return of(true);
  }

  logina(data) {
    localStorage.removeItem(HttpInterceptorService.TOKEN_NAME);
    return this.httpClient.post(`${environment.apiBaseUrl}/token`, data).pipe(map((response: any) => {
        localStorage.setItem(HttpInterceptorService.TOKEN_NAME, response.token);

    })).pipe(map((res => this.fetch())));
  }

  loginX(data) {
    localStorage.removeItem(HttpInterceptorService.TOKEN_NAME);
    return this.httpClient.post(`${environment.apiBaseUrl}/token`, data).pipe(map((response: any) => {
      localStorage.setItem(HttpInterceptorService.TOKEN_NAME, response.token);
      return response;
    }));
  }

  login(data) {
    localStorage.removeItem(HttpInterceptorService.TOKEN_NAME);
    return this.httpClient.post(`${environment.apiBaseUrl}/token`, data);
  }

  createUser(data): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/users`, data);
  }

  requestPasswordReset(data): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/password/forgot`, data);
  }

  getUser(): Observable<any> {
    if (AuthenticationService.initialized) {
      return of(AuthenticationService._user);
    }
    return this.fetch();
  }

  resetPassword(data): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/password/reset/${data.resetToken}`,
      { password: data.password },
      { responseType: 'text' });
  }

  changePassword(password: string): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/change-password`, { password }, { observe: 'response' });
  }

  fetch() {
    const wrapper = new AsyncSubject();
    AuthenticationService.ongoingFetch = wrapper;

    this.httpClient.get(`${environment.apiBaseUrl}/users/me`)
      .subscribe((res: any) => {
        AuthenticationService.initialized = true;
        const user = res;
        AuthenticationService._user = user;
        this.sessionUser = user;
        wrapper.next(user);
        wrapper.complete();
        if (this.isLoginPage()) {
          this.router.navigate(['/dashboard']);
        }
        AuthenticationService.user.next(user);
        AuthenticationService.ongoingFetch = null;
      }, (err: any) => {
        console.error(err);
        wrapper.error(err);
        wrapper.complete();
        AuthenticationService.user.next(null);
      });
    return AuthenticationService.ongoingFetch;
  }

  hasRole(role) {
    return AuthenticationService._user && AuthenticationService._user['role'].name === role;
  }

  hasAnyRole(roles: any[]) {
    return AuthenticationService._user && roles.indexOf(AuthenticationService._user['role'].name) >= 0;
  }

  hasAnyPermission(permissions: any[]) {
    permissions.forEach(p => {
      if (AuthenticationService.permissions.indexOf(p) >= 0) {
        return true;
      }
    });
    return false;
  }

  hasPermission(permission) {
    return AuthenticationService._user && AuthenticationService.permissions.indexOf(permission) >= 0;
  }

  isUserInSession(user: any) {
    return user && AuthenticationService._user && user.id == AuthenticationService._user['id'];
  }
  isStaffAdmin() {
    return this.hasRole(RoleType.ADMIN);
  }

  isStaffUser() {
    return this.hasAnyRole([RoleType.CLIENT_ADMIN, RoleType.CLIENT_USER]);
  }
  isLoginPage() {
    return this.router.url === '/login';
  }
}

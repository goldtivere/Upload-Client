import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';
import {of} from 'rxjs/observable/of';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {    //noinspection TypeScriptValidateTypes

    return this.authenticationService.getUser()
      .pipe(map((user => {
        if (!user) {
          console.log(user);
          this.router.navigate(['/login']);
        }
        return !!user;
      })))
      .pipe(catchError((err: any, caught: Observable<any>) => {
        // this.authenticationService.lastProtectedUrl = state.url;
        this.router.navigate(['/login']);
        return of(false);
      }));

  }

  private getCrpBaseUrl() {

    return '';
  }
}

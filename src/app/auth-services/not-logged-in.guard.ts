import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class NotLoggedInGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //noinspection TypeScriptValidateTypes
    return this.authenticationService.getUser()
      .pipe(map((user => {
        // console.log('user: ', user);
        if (user) {
          this.router.navigate(['/dashboard']);
          return false;
        }
        return true;
      })),
        catchError((err: any, caught: Observable<any>) => {
          return of(true);
        }));

  }
}

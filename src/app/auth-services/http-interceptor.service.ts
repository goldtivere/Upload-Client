import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, AsyncSubject, Observer } from 'rxjs';
import 'rxjs/add/operator/do';
import {HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class HttpInterceptorService {

  static TOKEN_NAME = 'PAYFORME_TOKEN';
  static headers = {};
  httpError: EventEmitter<HttpErrorResponse> = new EventEmitter();

  constructor(private router: Router, private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(HttpInterceptorService.TOKEN_NAME);
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
        req = req.clone({ setHeaders: headers });
    }
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['login']);
        }
      }
    });
  }
}

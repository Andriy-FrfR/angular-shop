import { AuthService } from './services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authServ: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept');
    if (req.headers.get('skipInterceptor')){
      const newHeaders = req.headers.delete('skipInterceptor');
      req = req.clone({headers: newHeaders});
      return next.handle(req);
    }

    return this.authServ.token
      .pipe(
        switchMap((token: string | null) => {
          if (token) {
            req = req.clone({
              setParams: {
                auth: token
              }
            });
          }

          return next.handle(req)
            .pipe(
              catchError((error: HttpErrorResponse) => {
                return throwError(error);
              })
            );
        })
      );
  }
}

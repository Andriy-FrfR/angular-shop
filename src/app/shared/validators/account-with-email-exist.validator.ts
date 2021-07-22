import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { AuthEmailValidationResponse } from '../interfaces/auth-email-validation-response.interface';
import { environment } from 'src/environments/environment';
import { first, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountWithEmailExist implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    // tslint:disable-next-line:max-line-length
    return this.http.post<AuthEmailValidationResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=${environment.APIKey}`, {
      identifier: control.value,
      continueUri: window.location.href
    }).pipe(
      switchMap((response: AuthEmailValidationResponse) => {
        return new Observable((observer: Observer<ValidationErrors | null>) => {
          if (!response.registered) {
            observer.next({ accountWithEmailExist: { message: 'Account with this email doesn\'t exist' } });
          }

          observer.next(null);
        });
      }),
      first()
    );
  }
}

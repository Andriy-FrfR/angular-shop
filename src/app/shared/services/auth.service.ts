import { UserData } from './../interfaces/user-data.interface';
import { environment } from './../../../environments/environment.prod';
import { UserAuth } from './../interfaces/user-auth.interface';
import { AuthRefreshTokenResponse } from './../interfaces/auth-refresh-token-response.interface';
import { Observable, Observer, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { first, map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  showAuthPopup(): void {
    this.auth$.next('show');
  }

  get token(): Observable<string | null> {
    if (!localStorage.getItem('token')) {
      return new Observable((observer: Observer<null>) => {
        observer.next(null);
      }).pipe(
        first()
      );
    }

    if (+(localStorage.getItem('expiresIn') || 0) < Date.now()) {
      return this.refreshToken().pipe(
        first()
      );
    }

    return new Observable((observer: Observer<string | null>) => {
      observer.next(localStorage.getItem('token') || null);
    }).pipe(
      first()
    );
  }

  private setToken(response: AuthResponse): void {
    localStorage.setItem('token', response.idToken);
    localStorage.setItem('expiresIn', `${Date.now() + +response.expiresIn * 1000}`);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('localId', response.localId);
  }

  refreshToken(): Observable<string> {
    return this.http.post<AuthRefreshTokenResponse>(`https://securetoken.googleapis.com/v1/token?key=${environment.APIKey}`, {
      grant_type : 'refresh_token',
      refresh_token: localStorage.getItem('refreshToken')
    }, {
      headers: {
        skipInterceptor: 'true'
      }
    }).pipe(
      map((response: AuthRefreshTokenResponse) => {
        this.setToken({
          expiresIn: response.expires_in,
          idToken: response.id_token,
          refreshToken: response.refresh_token,
          localId: response.user_id
        });

        return response.id_token;
      })
    );
  }

  logIn(user: UserAuth): Observable<AuthResponse> {
    user.returnSecureToken = true;

    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
                                        ${environment.APIKey}`, user)
      .pipe(
        tap(this.setToken),
        first()
      );
  }

  signUp(user: UserAuth): Observable<any> {
    user.returnSecureToken = true;

    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.APIKey}`, user)
      .pipe(
        tap(this.setToken),
        switchMap((data: AuthResponse) => {
          return this.http.post<UserData>(`${environment.dbUrl}/users/${data.localId}.json`, {
            productsInCart: ['']
          });
        }),
        first()
      );
  }
}

import { AuthRefreshTokenResponse } from './../interfaces/auth-refresh-token-response.interface';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { first, map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
          refreshToken: response.refresh_token
        });

        return response.id_token;
      })
    );
  }

  logIn(user: User): Observable<AuthResponse> {
    user.returnSecureToken = true;

    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
                                        ${environment.APIKey}`, user)
      .pipe(
        tap(this.setToken),
        first()
      );
  }

  signUp(user: User): Observable<AuthResponse> {
    user.returnSecureToken = true;

    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.APIKey}`, user)
      .pipe(
        tap(this.setToken),
        first()
      );
  }

  constructor(private http: HttpClient) { }
}

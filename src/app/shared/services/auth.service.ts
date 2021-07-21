import { AuthRefreshTokenResponse } from './../interfaces/auth-refresh-token-response.interface';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get token(): Observable<string> {
    if (!this.isAuthentificated) {
      return new Observable((observer: Observer<string>) => {
        observer.next('');
      });
    }

    if (0 < Date.now()) {
      return this.refreshToken();
    }

    return new Observable((observer: Observer<string>) => {
      observer.next(localStorage.getItem('token') || '');
    });
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

  isAuthentificated(): boolean {
    return !!this.token;
  }

  logIn(user: User): Observable<AuthResponse> {
    user.returnSecureToken = true;

    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
                                        ${environment.APIKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  signUp(user: User): Observable<AuthResponse> {
    user.returnSecureToken = true;

    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.APIKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  constructor(private http: HttpClient) { }
}

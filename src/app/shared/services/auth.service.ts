import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logIn(): void {
    return;
  }

  signUp(email: string, password: string): void {

  }

  constructor(private http: HttpClient) { }
}

import { BackdropService } from './../../shared/services/backdrop.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss']
})
export class AuthPopupComponent implements OnInit {
  logInForm!: FormGroup;
  signUpForm!: FormGroup;

  showLogIn = true;

  constructor(private backdropServ: BackdropService,
              private authServ: AuthService) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });

    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  switchForm(): void {
    this.showLogIn = !this.showLogIn;
  }

  logIn(): void {
    if (this.logInForm.invalid) {
      return;
    }

    this.authServ.logIn();

    this.backdropServ.hideBackdrop();
  }

  signUp(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    this.authServ.signUp(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value);

    this.backdropServ.hideBackdrop();
  }
}

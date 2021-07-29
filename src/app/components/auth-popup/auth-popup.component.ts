import { AccountWithEmailExist } from './../../shared/validators/account-with-email-exist.validator';
import { UniqueEmail } from './../../shared/validators/unique-email.validator';
import { BackdropService } from './../../shared/services/backdrop.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss']
})
export class AuthPopupComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  logInForm!: FormGroup;
  signUpForm!: FormGroup;
  showLogIn = true;
  showWrongPassword = false;
  showTooManyAttempts = false;

  constructor(
    private backdropServ: BackdropService,
    private authServ: AuthService,
    private uniqueEmailValidator: UniqueEmail,
    private accountExistValidator: AccountWithEmailExist
  ) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ], [
        this.accountExistValidator.validate.bind(this.accountExistValidator)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ], [
        this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  switchForm(): void {
    this.showLogIn = !this.showLogIn;
  }

  loginPasswordInput(): void {
    this.showWrongPassword = false;
  }

  logIn(): void {
    if (this.logInForm.invalid || this.logInForm.pending) {
      return;
    }

    this.subscriptions.push(
      this.authServ.logIn({
        email: this.logInForm.get('email')?.value,
        password: this.logInForm.get('password')?.value
      }).subscribe((data: any) => {
        console.log(data);
        this.backdropServ.hideBackdrop();
      }, (error: HttpErrorResponse) => {
        console.error(error);

        this.logInForm.reset();

        if (error.error.error.message === 'INVALID_PASSWORD') {
          this.showWrongPassword = true;
        }

        if (error.error.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.') {
          this.showTooManyAttempts = true;
        }
      })
    );
  }

  signUp(): void {
    if (this.signUpForm.invalid || this.signUpForm.pending) {
      return;
    }

    this.subscriptions.push(
      this.authServ.signUp({
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value
      }).subscribe((data: any) => {
        console.log(data);
        this.backdropServ.hideBackdrop();
      })
    );
  }
}

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
        Validators.minLength(6)
      ])
    });

    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
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

    this.authServ.logIn({
      email: this.logInForm.get('email')?.value,
      password: this.logInForm.get('password')?.value
    }).subscribe((data: any) => {
      console.log(data);
    });

    this.backdropServ.hideBackdrop();
  }

  signUp(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    this.authServ.signUp({
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value
    }).subscribe((data: any) => {
      console.log(data);
    });

    this.backdropServ.hideBackdrop();
  }
}

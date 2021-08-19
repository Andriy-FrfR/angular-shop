import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  contactForm$ = new Subject<string>();

  constructor() { }

  contactFormDataChanged(): void {
    this.contactForm$.next('changed');
  }
}

import { first } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShippingPrices } from '../interfaces/shipping-prices.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  contactForm$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  contactFormDataChanged(): void {
    this.contactForm$.next('changed');
  }

  getShippingPrices(): Observable<ShippingPrices> {
    return this.http.get<ShippingPrices>(`${environment.dbUrl}/shipping-prices.json`)
      .pipe(
        first()
      );
  }
}

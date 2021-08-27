import { Order } from './../interfaces/order.interface';
import { UserData } from './../interfaces/user-data.interface';
import { UserDataService } from './user-data.service';
import { FormGroup } from '@angular/forms';
import { first, switchMap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShippingPrices } from '../interfaces/shipping-prices.interface';
import { ProductInCart } from '../interfaces/product-in-cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  contactForm$ = new Subject<string>();
  checkout$ = new Subject<string>();

  constructor(
    private http: HttpClient,
    private userDataServ: UserDataService
  ) { }

  contactFormDataChanged(): void {
    this.contactForm$.next('changed');
  }

  emitOrder(): void {
    this.checkout$.next('confirm');
  }

  createOrder(checkoutForm: FormGroup, products: ProductInCart[], price: number): Observable<any> {
    return this.userDataServ.getUserData()
      .pipe(
        switchMap((userData: UserData) => {
          const order: Order = {
            products,
            price,
            adress: checkoutForm.get('adress')?.value,
            shipping: checkoutForm.get('shipping')?.value,
            payment: checkoutForm.get('payment')?.value,
            customerContactData: {
              name: checkoutForm.get('customer-contact-data')?.get('name')?.value,
              surname: checkoutForm.get('customer-contact-data')?.get('surname')?.value,
              number: checkoutForm.get('customer-contact-data')?.get('number')?.value,
              city: checkoutForm.get('customer-contact-data')?.get('city')?.value
            },
            receiverContactData: {
              name: checkoutForm.get('receiver-contact-data')?.get('name')?.value,
              surname: checkoutForm.get('receiver-contact-data')?.get('surname')?.value,
              number: checkoutForm.get('receiver-contact-data')?.get('number')?.value,
              city: checkoutForm.get('receiver-contact-data')?.get('city')?.value
            }
          };

          if (!userData.orders) {
            userData.orders = [];
          }

          userData.orders.push(order);

          return this.userDataServ.patchUserData(userData);
        })
      );
  }

  getShippingPrices(): Observable<ShippingPrices> {
    return this.http.get<ShippingPrices>(`${environment.dbUrl}/shipping-prices.json`)
      .pipe(
        first()
      );
  }
}

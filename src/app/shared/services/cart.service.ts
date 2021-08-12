import { ProductInCart } from './../interfaces/product-in-cart.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: Subject<string> = new Subject();

  constructor() { }

  showCart(): void {
    this.cart$.next('show cart');
  }

  patchProductsInCart(): void {
    this.cart$.next('patch');
  }

  productsInCartChanged(): void {
    this.cart$.next('changed');
  }

  setProductsToCheckout(products: ProductInCart[]): void {
    localStorage.setItem('productsToCheckout', JSON.stringify(products));
  }

  getProductsToCheckout(): ProductInCart[] {
    return JSON.parse(localStorage.getItem('productsToCheckout') || '');
  }
}

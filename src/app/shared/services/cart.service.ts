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
    this.cart$.next('patch cart');
  }

  productsInCartChanged(): void {
    this.cart$.next('cart changed');
  }

  productsToCheckoutChanged(): void {
    this.cart$.next('products to checkout changed');
  }

  setProductsToCheckout(products: ProductInCart[]): void {
    localStorage.setItem('productsToCheckout', JSON.stringify(products));
  }

  getProductsToCheckout(): ProductInCart[] {
    return JSON.parse(localStorage.getItem('productsToCheckout') || '');
  }

  removeProductsToCheckout(): void {
    localStorage.removeItem('productsToCheckout');
  }
}

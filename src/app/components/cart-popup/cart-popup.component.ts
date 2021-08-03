import { ProductInCart } from './../../shared/interfaces/product-in-cart.interface';
import { Subscription } from 'rxjs';
import { UserData } from './../../shared/interfaces/user-data.interface';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss']
})
export class CartPopupComponent implements OnInit, OnDestroy {
  productsInCart: ProductInCart[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authServ.getUserData().subscribe((userData: UserData) => {
        this.productsInCart = userData.productsInCart;
      })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  countPrice(): number {
    let sum = 0;

    for (const productInCart of this.productsInCart) {
      sum += productInCart.priceForAll || 0;
    }

    return sum;
  }
}

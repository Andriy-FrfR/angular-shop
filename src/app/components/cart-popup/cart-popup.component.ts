import { UserDataService } from './../../shared/services/user-data.service';
import { ProductInCart } from './../../shared/interfaces/product-in-cart.interface';
import { Subscription } from 'rxjs';
import { UserData } from './../../shared/interfaces/user-data.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss']
})
export class CartPopupComponent implements OnInit, OnDestroy {
  userData!: UserData;
  productsInCart: ProductInCart[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private userDataServ: UserDataService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userDataServ.getUserData().subscribe((userData: UserData) => {
        this.userData = userData;

        if (!this.userData.productsInCart) {
          this.userData.productsInCart = [];
        }

        this.productsInCart = userData.productsInCart;

        this.countPrice();
      })
    );

    this.subscriptions.push(
      this.userDataServ.cart$.subscribe((message: string) => {
        if (message === 'patch') {
          this.userDataServ.patchUserData(this.userData).subscribe(() => {
            this.userDataServ.productsInCartChanged();

            this.countPrice();
          });
        }
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

  onRemoveProductFromCartEvent(productToDelete: ProductInCart): void {
    this.productsInCart.forEach((productInCart: ProductInCart, index: number) => {
      if (productInCart === productToDelete) {
        this.productsInCart.splice(index, 1);

        this.userDataServ.patchProductsInCart();
        return;
      }
    });
  }
}

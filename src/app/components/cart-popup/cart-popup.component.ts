import { CartService } from './../../shared/services/cart.service';
import { Router } from '@angular/router';
import { BackdropService } from './../../shared/services/backdrop.service';
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
    private userDataServ: UserDataService,
    private cartServ: CartService,
    private backdropServ: BackdropService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userDataServ.getUserData().subscribe((userData: UserData) => {
        this.userData = userData;

        if (!this.userData.productsInCart) {
          this.userData.productsInCart = [];
        }

        this.productsInCart = userData.productsInCart || [];
      })
    );

    this.subscriptions.push(
      this.cartServ.cart$.subscribe((message: string) => {
        if (message === 'patch') {
          this.userDataServ.patchUserData(this.userData).subscribe(() => {
            this.cartServ.productsInCartChanged();
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

  countProductsPrice(): number {
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

        this.cartServ.patchProductsInCart();
        return;
      }
    });
  }

  continueShopping(): void {
    this.backdropServ.hideBackdrop();
  }

  makeOrder(): void {
    this.cartServ.setProductsToCheckout(this.productsInCart);

    this.router.navigate(['/checkout']);

    this.backdropServ.hideBackdrop();
  }
}

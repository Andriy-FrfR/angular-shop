import { CheckoutService } from './../shared/services/checkout.service';
import { UserDataService } from './../shared/services/user-data.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faChevronRight, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { CartService } from './../shared/services/cart.service';
import { ProductInCart } from './../shared/interfaces/product-in-cart.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserData } from '../shared/interfaces/user-data.interface';
import { ShippingPrices } from '../shared/interfaces/shipping-prices.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  faChevronRight = faChevronRight;
  faMapMarkerAlt = faMapMarkerAlt;
  productsToCheckout: ProductInCart[] = [];
  checkoutForm!: FormGroup;
  shippingPrices!: ShippingPrices;
  showAdressInput = true;
  receiver = 'Me';
  subscriptions: Subscription[] = [];

  constructor(
    private cartServ: CartService,
    private userDataServ: UserDataService,
    private checkoutServ: CheckoutService
  ) { }

  ngOnInit(): void {
    this.productsToCheckout = this.cartServ.getProductsToCheckout();

    this.checkoutForm = new FormGroup({
      adress: new FormControl(null, Validators.required),
      shipping: new FormControl('angularShopPickupPoints', Validators.required),
      payment: new FormControl('Payment upon receipt of goods', [
        Validators.required,
        Validators.minLength(4)
      ])
    });

    this.subscriptions.push(
      this.userDataServ.getUserData()
        .subscribe((userData: UserData) => {
          if (!userData.adress) {
            return;
          }

          this.checkoutForm.get('adress')?.setValue(userData.adress);

          this.showAdressInput = false;
        })
    );

    this.subscriptions.push(
      this.checkoutServ.getShippingPrices()
        .subscribe((shippingPrices: ShippingPrices) => {
          this.shippingPrices = shippingPrices;
        })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private patchAdress(): void {
    this.subscriptions.push(
      this.userDataServ.getUserData()
        .subscribe((userData: UserData) => {
          userData.adress = this.checkoutForm.get('adress')?.value;

          this.subscriptions.push(
            this.userDataServ.patchUserData(userData)
              .subscribe((patchedData) => {
                console.log(patchedData);
              })
          );
        })
    );
  }

  countPrice(): number {
    let sum = 0;

    for (const productToCheckout of this.productsToCheckout) {
      sum += productToCheckout.priceForAll || 0;
    }

    return sum;
  }

  adressInputToggle(): void {
    if (this.checkoutForm.get('adress')?.invalid) {
      return;
    }

    this.showAdressInput = !this.showAdressInput;

    if (!this.showAdressInput) {
      this.patchAdress();
    }
  }
}

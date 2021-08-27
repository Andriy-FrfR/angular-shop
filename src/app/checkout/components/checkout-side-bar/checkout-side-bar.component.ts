import { CheckoutService } from './../../../shared/services/checkout.service';
import { ShippingPrices } from './../../../shared/interfaces/shipping-prices.interface';
import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductInCart } from 'src/app/shared/interfaces/product-in-cart.interface';

@Component({
  selector: 'app-checkout-side-bar',
  templateUrl: './checkout-side-bar.component.html',
  styleUrls: ['./checkout-side-bar.component.scss']
})
export class CheckoutSideBarComponent implements OnInit, OnDestroy {
  @Input() productsToCheckout!: ProductInCart[];
  @Input() shippingPrices!: ShippingPrices;
  @Input() shippingMethod!: string;
  subscriptions: Subscription[] = [];

  constructor(private checkoutServ: CheckoutService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  countProductsPrice(): number {
    let sum = 0;

    for (const productToCheckout of this.productsToCheckout) {
      sum += productToCheckout.priceForAll || 0;
    }

    return sum;
  }

  getShippingPrice(): string {
    if (this.shippingMethod === 'courier') {
      return this.shippingPrices?.courier + ' ₴';
    }

    if (this.shippingMethod === 'angularShopPickupPoints') {
      return this.shippingPrices?.angularShopPickupPoints;
    }

    if (this.shippingMethod === 'postOffices') {
      return this.shippingPrices?.postOffices;
    }

    return '';
  }

  countTotalPrice(): number {
    if (this.shippingMethod === 'courier') {
      return this.countProductsPrice() + this.shippingPrices?.courier || 0;
    }

    return this.countProductsPrice();
  }

  onConfirm(): void {
    this.checkoutServ.emitOrder();
  }
}

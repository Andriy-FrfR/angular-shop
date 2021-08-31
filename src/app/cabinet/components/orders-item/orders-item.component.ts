import { CheckoutService } from './../../../shared/services/checkout.service';
import { ShippingPrices } from './../../../shared/interfaces/shipping-prices.interface';
import { Subscription } from 'rxjs';
import { Product } from './../../../shared/interfaces/product.interface';
import { ProductsService } from './../../../shared/services/products.service';
import { Order } from './../../../shared/interfaces/order.interface';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.scss']
})
export class OrdersItemComponent implements OnInit, OnDestroy {
  @Input() order!: Order;
  products: Product[] = [];
  showOrderContent = false;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  subscriptions: Subscription[] = [];

  constructor(
    private productsServ: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadOrderProducts();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private loadOrderProducts(): void {
    for (const productInCart of this.order.products) {
      this.subscriptions.push(
        this.productsServ.getProductById(productInCart.productId)
          .subscribe((product: Product) => {
            this.products.push(product);
          })
      );
    }
  }

  toggleOrderContent(): void {
    this.showOrderContent = !this.showOrderContent;
  }
}

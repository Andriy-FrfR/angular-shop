import { CartService } from './../shared/services/cart.service';
import { ProductInCart } from './../shared/interfaces/product-in-cart.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  productsToCheckout: ProductInCart[] = [];

  constructor(
    private cartServ: CartService
  ) { }

  ngOnInit(): void {
    this.productsToCheckout = this.cartServ.getProductsToCheckout();
  }

}

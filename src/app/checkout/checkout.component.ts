import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faChevronRight, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { CartService } from './../shared/services/cart.service';
import { ProductInCart } from './../shared/interfaces/product-in-cart.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  faChevronRight = faChevronRight;
  faMapMarkerAlt = faMapMarkerAlt;
  productsToCheckout: ProductInCart[] = [];
  checkoutForm!: FormGroup;
  showAdressInput = true;
  receiver = 'Me' ;

  constructor(
    private cartServ: CartService
  ) { }

  ngOnInit(): void {
    this.productsToCheckout = this.cartServ.getProductsToCheckout();

    this.checkoutForm = new FormGroup({
      adress: new FormControl(null, Validators.required),
      shipping: new FormControl(null, Validators.required),
      payment: new FormControl(null, Validators.required)
    });

    console.log(this.checkoutForm);
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
  }
}

import { UserDataService } from './../../shared/services/user-data.service';
import { ProductInCart } from './../../shared/interfaces/product-in-cart.interface';
import { FormControl } from '@angular/forms';
import { DownloadUrl } from './../../load/shared/interfaces/download-url.interface';
import { LoadService } from './../../load/shared/load.service';
import { BackdropService } from './../../shared/services/backdrop.service';
import { ProductsService } from './../../shared/services/products.service';
import { Subscription } from 'rxjs';
import { Product } from './../../shared/interfaces/product.interface';
import { Component, Input, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-popup-item',
  templateUrl: './cart-popup-item.component.html',
  styleUrls: ['./cart-popup-item.component.scss']
})
export class CartPopupItemComponent implements OnInit, OnDestroy {
  @Input() productInCart!: ProductInCart;
  faMinus = faMinus;
  faPlus = faPlus;
  product!: Product;
  imgUrl!: DownloadUrl;
  amountInput!: FormControl;
  subscriptions: Subscription[] = [];

  constructor(
    private productsServ: ProductsService,
    private backdropServ: BackdropService,
    private loadServ: LoadService,
    private userDataServ: UserDataService
  ) { }

  ngOnInit(): void {
    this.amountInput = new FormControl(this.productInCart?.amount);

    this.subscriptions.push(
      this.productsServ.getProductById(this.productInCart.productId)
        .subscribe((product: Product) => {
          this.product = product;

          this.loadProductImg();

          this.setPrice();
        })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  loadProductImg(): void {
    const downloadUrlsAsync = this.loadServ.downloadImg(this.product);

    for (const downloadUrlAsync of downloadUrlsAsync ) {
      if (downloadUrlAsync.index === 0) {
        downloadUrlAsync.urlObs.subscribe((url: string) => {
          this.imgUrl = {url, index: downloadUrlAsync.index};
        });
      }
    }
  }

  private setPrice(): void {
    this.productInCart.priceForAll = this.amountInput.value * this.product.price;
  }

  private setAmount(): void {
    this.productInCart.amount = this.amountInput.value;
  }

  private patchCartProducts(): void {
    this.userDataServ.patchProductsInCart();
  }

  openProductPage(): void {
    this.backdropServ.hideBackdrop();
  }

  amountInputOnBlur(): void {
    const amount = this.amountInput.value;

    if (amount > this.product.amount) {
      this.amountInput.setValue(this.product.amount);
    } else if (amount < 1) {
      this.amountInput.setValue(1);
    }

    this.setAmount();
    this.setPrice();

    this.patchCartProducts();
  }

  minusAmount(): void {
    let amount = this.amountInput.value;

    this.amountInput.setValue(amount-- - 1);

    if (amount < 1) {
      this.amountInput.setValue(1);
    }

    this.setAmount();
    this.setPrice();

    this.patchCartProducts();
  }

  addAmount(): void {
    let amount = this.amountInput.value;

    this.amountInput.setValue(amount++ + 1);

    if (amount >= this.product.amount) {
      this.amountInput.setValue(this.product.amount);
    }

    this.setAmount();
    this.setPrice();

    this.patchCartProducts();
  }
}

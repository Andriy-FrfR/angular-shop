import { DownloadUrl } from './../../../load/shared/interfaces/download-url.interface';
import { LoadService } from './../../../load/shared/load.service';
import { Subscription } from 'rxjs';
import { ProductsService } from './../../../shared/services/products.service';
import { ProductInCart } from './../../../shared/interfaces/product-in-cart.interface';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-checkout-product',
  templateUrl: './checkout-product.component.html',
  styleUrls: ['./checkout-product.component.scss']
})
export class CheckoutProductComponent implements OnInit, OnDestroy {
  @Input() productToCheckout!: ProductInCart;
  product!: Product;
  imgUrl!: DownloadUrl;
  subscriptions: Subscription[] = [];

  constructor(
    private productsServ: ProductsService,
    private loadServ: LoadService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.productsServ.getProductById(this.productToCheckout.productId)
        .subscribe((product: Product) => {
          this.product = product;

          this.loadImg();
        })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private loadImg(): void {
    const downloadImgAsyncArr = this.loadServ.downloadImg(this.product);

    for (const downloadImgAsync of downloadImgAsyncArr) {
      if (downloadImgAsync.index === 0) {
        downloadImgAsync.urlObs.subscribe((imgUrl: string) => {
          this.imgUrl = { url: imgUrl, index: downloadImgAsync.index};
        });
      }
    }
  }

}

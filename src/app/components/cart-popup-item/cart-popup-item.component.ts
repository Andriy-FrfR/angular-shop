import { DownloadUrl } from './../../load/shared/interfaces/download-url.interface';
import { LoadService } from './../../load/shared/load.service';
import { BackdropService } from './../../shared/services/backdrop.service';
import { ProductsService } from './../../shared/services/products.service';
import { Subscription } from 'rxjs';
import { Product } from './../../shared/interfaces/product.interface';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-popup-item',
  templateUrl: './cart-popup-item.component.html',
  styleUrls: ['./cart-popup-item.component.scss']
})
export class CartPopupItemComponent implements OnInit, OnDestroy {
  @Input() productId!: string;
  product!: Product;
  imgUrl!: DownloadUrl;
  subscriptions: Subscription[] = [];

  constructor(
    private productsServ: ProductsService,
    private backdropServ: BackdropService,
    private loadServ: LoadService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.productsServ.getProductById(this.productId)
        .subscribe((product: Product) => {
          this.product = product;

          this.loadProductImg();
        })
    );
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

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  openProductPage(): void {
    this.backdropServ.hideBackdrop();
  }
}

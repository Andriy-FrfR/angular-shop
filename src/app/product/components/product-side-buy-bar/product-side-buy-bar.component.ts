import { Product } from './../../../shared/interfaces/product.interface';
import { faCheckCircle, faMinusCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { DownloadUrl } from './../../../load/shared/interfaces/download-url.interface';
import { LoadService } from './../../../load/shared/load.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DownloadUrlAsync } from 'src/app/load/shared/interfaces/download-url-async.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-side-buy-bar',
  templateUrl: './product-side-buy-bar.component.html',
  styleUrls: ['./product-side-buy-bar.component.scss']
})
export class ProductSideBuyBarComponent implements OnInit, OnDestroy {
  @Input() set product(product: Product) {
    this._product = product;
  }

  get product(): Product {
    return this._product;
  }

  // tslint:disable-next-line:variable-name
  _product!: Product;
  imgUrl!: DownloadUrl;
  faCheckCircle = faCheckCircle;
  faMinusCircle = faMinusCircle;
  faShoppingCart = faShoppingCart;
  subscriptions: Subscription[] = [];

  constructor(private loadServ: LoadService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  loadImages(): void {
    const imgUrlsAsyncArr: DownloadUrlAsync[] = this.loadServ.downloadImg(this.product);

    for (const imgUrlAsync of imgUrlsAsyncArr) {
      if (imgUrlAsync.index === 0) {
        this.subscriptions.push(
          imgUrlAsync.urlObs.subscribe((url: string) => {
            this.imgUrl = {url, index: imgUrlAsync.index };
          })
        );
      }
    }
  }

}

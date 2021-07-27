import { AuthService } from 'src/app/shared/services/auth.service';
import { BackdropService } from './../shared/services/backdrop.service';
import { DownloadUrl } from 'src/app/load/shared/interfaces/download-url.interface';
import { DownloadUrlAsync } from '../load/shared/interfaces/download-url-async.interface';
import { LoadService } from '../load/shared/load.service';
import { ProductsService } from '../shared/services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { faCheckCircle, faMinusCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product!: Product;
  imgUrls: DownloadUrl[] = [];
  activeImgUrl = '';
  faCheckCircle = faCheckCircle;
  faMinusCircle = faMinusCircle;
  faShoppingCart = faShoppingCart;
  showReviewsForm = false;
  subscriptions: Subscription[] = [];

  constructor(
      private productsServ: ProductsService,
      private route: ActivatedRoute,
      private loadServ: LoadService,
      private backdropServ: BackdropService,
      private authServ: AuthService
    ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.productsServ.getProductById(params.id).subscribe((product: Product) => {
          this.product = product;

          this.loadImages();
        });
      })
    );

    this.subscriptions.push(
      this.backdropServ.backdrop$.subscribe((message: string) => {
        if (message === 'hide') {
          this.showReviewsForm = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  loadImages(): void {
    const imgUrlsArr: DownloadUrlAsync[] = this.loadServ.downloadImg(this.product);

    for (const imgUrl of imgUrlsArr) {
      this.subscriptions.push(
        imgUrl.urlObs.subscribe((downloadUrl: any) => {
          this.imgUrls.push({url: downloadUrl, index: imgUrl.index});

          this.sortImgByIndex();

          if (imgUrl.index === 0) {
            this.activeImgUrl = downloadUrl;
          }
        })
      );
    }
  }

  setActiveImg(imgUrl: any): void {
    this.activeImgUrl = imgUrl;
  }

  sortImgByIndex(): void {
    this.imgUrls.sort((a, b) => {
      return a.index - b.index;
    });
  }

  onReviewsFormShow(): void {
    this.authServ.token.subscribe((token: string | null) => {
      if (!token) {
        this.authServ.showAuthPopup();
        return;
      }

      this.backdropServ.showBackdrop();
      this.showReviewsForm = true;
    });
  }
}

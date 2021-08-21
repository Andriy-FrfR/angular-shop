import { CartService } from 'src/app/shared/services/cart.service';
import { UserData } from './../shared/interfaces/user-data.interface';
import { UserDataService } from './../shared/services/user-data.service';
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
  userData!: UserData;
  faCheckCircle = faCheckCircle;
  faMinusCircle = faMinusCircle;
  faShoppingCart = faShoppingCart;
  showReviewsForm = false;
  showAlreadyInCartBtn = false;
  subscriptions: Subscription[] = [];

  constructor(
    private productsServ: ProductsService,
    private route: ActivatedRoute,
    private loadServ: LoadService,
    private backdropServ: BackdropService,
    private authServ: AuthService,
    private userDataServ: UserDataService,
    private cartServ: CartService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.imgUrls = [];

        this.productsServ.getProductById(params.id).subscribe((product: Product) => {
          this.product = product;

          this.loadImages();

          this.subscriptions.push(
            this.checkProductAlreadyInCart()
          );
        });
      })
    );

    this.subscriptions.push(
      this.cartServ.cart$.subscribe((message: string) => {
        if (message === 'cart changed') {
          this.subscriptions.push(
            this.checkProductAlreadyInCart()
          );
        }
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

  private checkProductAlreadyInCart(): Subscription {
    return this.userDataServ.getUserData()
      .subscribe((userData: UserData) => {
        this.userData = userData;

        if (!userData.productsInCart) {
          this.showAlreadyInCartBtn = false;
          return;
        }

        for (const productInCart of userData.productsInCart) {
          if (this.product.id === productInCart.productId) {
            this.showAlreadyInCartBtn = true;
            return;
          }

          this.showAlreadyInCartBtn = false;
        }
      });
  }

  private loadImages(): void {
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

  private sortImgByIndex(): void {
    this.imgUrls.sort((a, b) => {
      return a.index - b.index;
    });
  }

  setActiveImg(imgUrl: any): void {
    this.activeImgUrl = imgUrl;
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

  addProductToCart(): void {
    this.authServ.token.subscribe((token: string | null) => {
      if (!token) {
        this.authServ.showAuthPopup();
        return;
      }

      this.userDataServ.getUserData().subscribe((userData: UserData) => {
        if (!userData.productsInCart) {
          userData.productsInCart = [];
        }

        userData.productsInCart.push({productId: this.product.id || '', amount: 1});

        this.userDataServ.patchUserData(userData).subscribe(() => {
          this.checkProductAlreadyInCart();

          this.cartServ.showCart();
        });
      });
    });
  }

  alreadyInCartClick(): void {
    this.cartServ.showCart();
  }
}

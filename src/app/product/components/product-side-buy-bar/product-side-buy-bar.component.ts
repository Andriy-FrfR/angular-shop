import { AuthService } from './../../../shared/services/auth.service';
import { UserDataService } from './../../../shared/services/user-data.service';
import { UserData } from './../../../shared/interfaces/user-data.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';
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

    this.checkProductAlreadyInCart();
  }

  get product(): Product {
    return this._product;
  }

  showAlreadyInCartBtn = false;
  alreadyInCartBtnChecked = false;

  // tslint:disable-next-line:variable-name
  _product!: Product;
  imgUrl!: DownloadUrl;
  userData!: UserData;
  faCheckCircle = faCheckCircle;
  faMinusCircle = faMinusCircle;
  faShoppingCart = faShoppingCart;
  subscriptions: Subscription[] = [];

  constructor(
    private loadServ: LoadService,
    private cartServ: CartService,
    private userDataServ: UserDataService,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
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
      this.authServ.auth$.subscribe((message: string) => {
        if (message === 'authorized') {
          this.subscriptions.push(
            this.checkProductAlreadyInCart()
          );
        }
      })
    );

    this.loadImages();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private checkProductAlreadyInCart(): Subscription {
    this.alreadyInCartBtnChecked = false;

    return this.userDataServ.getUserData()
      .subscribe((userData: UserData) => {
        if (!userData) {
          return;
        }

        this.userData = userData;

        if (!userData.productsInCart) {
          this.showAlreadyInCartBtn = false;
          this.alreadyInCartBtnChecked = true;
          return;
        }

        for (const productInCart of userData.productsInCart) {
          if (this.product.id === productInCart.productId) {
            this.showAlreadyInCartBtn = true;
            return;
          }

          this.showAlreadyInCartBtn = false;
        }

        this.alreadyInCartBtnChecked = true;
      });
  }

  alreadyInCartClick(): void {
    this.cartServ.showCart();
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

  addProductToCart(): void {
    this.authServ.token.subscribe((token: string | null) => {
      if (!token) {
        this.authServ.showAuthPopup();
        return;
      }

      if (!this.alreadyInCartBtnChecked) {
        return;
      }

      this.userDataServ.getUserData().subscribe((userData: UserData) => {
        if (!userData.productsInCart) {
          userData.productsInCart = [];
        }

        userData.productsInCart.push({productId: this.product.id || '', amount: 1});

        this.userDataServ.patchUserData(userData).subscribe(() => {
          this.cartServ.productsInCartChanged();

          this.cartServ.showCart();
        });
      });
    });
  }
}

import { CartService } from './../../shared/services/cart.service';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BackdropService } from '../../shared/services/backdrop.service';
import { Category } from './../../shared/interfaces/category.interface';
import { CatalogService } from '../../shared/services/catalog.service';
import { ProductsService } from '../../shared/services/products.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {
  @Input() sidenav!: MatSidenav;
  faUser = faUser;
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;
  products!: Product[];
  searchInput!: FormControl;
  categories!: Category[];
  isAuthorized = false;
  showCatalog = false;
  showAuth = false;
  showCart = false;
  subscriptions: Subscription[] = [];

  constructor(
    private productsServ: ProductsService,
    private catalogServ: CatalogService,
    private router: Router,
    private backdropServ: BackdropService,
    private authServ: AuthService,
    private cartServ: CartService
  ) { }

  ngOnInit(): void {
    this.searchInput = new FormControl('');

    this.subscriptions.push(
      this.productsServ.getProducts().subscribe((products: Product[]) => {
        this.products = products;
      })
    );

    this.subscriptions.push(
      this.catalogServ.getCategories().subscribe((categories: Category[]) => {
        this.categories = categories;
      })
    );

    this.subscriptions.push(
      this.backdropServ.backdrop$.subscribe((message: string) => {
        if (message === 'hide') {
          this.showCatalog = false;
          this.showAuth = false;
          this.showCart = false;
        }
      })
    );

    this.subscriptions.push(
      this.authServ.token
        .subscribe((token: string | null) => {
          if (!token) {
            return;
          }

          this.isAuthorized = true;
        })
    );

    this.subscriptions.push(
      this.authServ.auth$.subscribe((message: string) => {
        if (message === 'show') {
          this.showAuthPopup();
        }

        if (message === 'authorized') {
          this.isAuthorized = true;
        }
      })
    );

    this.subscriptions.push(
      this.cartServ.cart$.subscribe((message: string) => {
        if (message === 'show cart') {
          this.showCartPopup();
        }
      })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  sidenavToggle(): void {
    this.sidenav.toggle();
  }

  searchByString(searchStr: string): void {
    if (!searchStr) {
      return;
    }

    this.router.navigate(['/search'], { queryParams: { searchStr } });
  }

  showCategoriesPopup(): void {
    this.backdropServ.showBackdrop();
    this.showCatalog = true;
  }

  showAuthPopup(): void {
    this.backdropServ.showBackdrop();
    this.showAuth = true;
  }

  showCartPopup(): void {
    this.authServ.token.subscribe((token: string | null) => {
      if (!token) {
        this.authServ.showAuthPopup();
        return;
      }

      this.backdropServ.showBackdrop();
      this.showCart = true;
    });
  }

  navigateToWishlist(): void {
    this.router.navigate(['cabinet', 'wish-list']);
  }
}

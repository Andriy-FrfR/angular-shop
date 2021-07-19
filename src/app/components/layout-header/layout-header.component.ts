import { BackdropService } from '../../shared/services/backdrop.service';
import { Category } from './../../shared/interfaces/category.interface';
import { CatalogService } from '../../shared/services/catalog.service';
import { ProductsService } from '../../shared/services/products.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;

  products!: Product[];
  searchInput!: FormControl;
  categories!: Category[];
  showCatalog = false;
  showAuth = false;
  faUser = faUser;

  constructor(private productsServ: ProductsService,
              private catalogServ: CatalogService,
              private router: Router,
              private backdropServ: BackdropService) { }

  ngOnInit(): void {
    this.searchInput = new FormControl('');

    this.productsServ.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });

    this.catalogServ.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.backdropServ.backdrop$.subscribe((message: string) => {
      if (message === 'hide') {
        this.showCatalog = false;
        this.showAuth = false;
      }
    });
  }

  sidenavToggle(): void {
    this.sidenav.toggle();
  }

  searchByString(searchStr: string): void {
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

  // getCategories(): void {
  //   this.catalogServ.createCategory('Another category').subscribe((category: any) => {
  //     console.log(category);
  //     this.catalogServ.getCategoryById(category.name).subscribe((newCategory: Category) => {
  //       console.log(newCategory);
  //       this.catalogServ.createSubCategory(newCategory, 'some subcategory').subscribe((e) => {
  //         console.log(e);
  //       });
  //       this.catalogServ.createSubCategory(newCategory, 'another subcategory').subscribe((e) => {
  //         console.log(e);
  //       });
  //       this.catalogServ.createSubCategory(newCategory, '3rd subcategory').subscribe((e) => {
  //         console.log(e);
  //       });
  //     });
  //   });
  // }
}

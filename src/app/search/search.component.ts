import { CatalogService } from '../shared/services/catalog.service';
import { Category } from '../shared/interfaces/category.interface';
import { Product } from '../shared/interfaces/product.interface';
import { ProductsService } from '../shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products!: Product[];
  searchStr!: string;
  categories!: Category[];
  searchCategory!: string;
  searchSubCategory!: string;

  constructor(private productsServ: ProductsService, private catalogServ: CatalogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productsServ.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(this.products);
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.searchStr = params.searchStr;
      this.searchCategory = params.category;
      this.searchSubCategory = params.subCategory;
    });

    this.catalogServ.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

}

import { Product } from './../../shared/interfaces/product.interface';
import { ProductsService } from './../../services/products.service';
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

  constructor(private productsServ: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productsServ.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(products);
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.searchStr = params.searchStr;
      console.log(params);
    });
  }

}

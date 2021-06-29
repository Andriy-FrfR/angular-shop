import { Product } from './../../shared/interfaces/product.interface';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products!: Product[];

  constructor(private productsServ: ProductsService) { }

  ngOnInit(): void {
    this.productsServ.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(products);
    });
  }

}

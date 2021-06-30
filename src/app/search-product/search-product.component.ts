import { Product } from './../shared/interfaces/product.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  @Input() product!: Product;

  constructor() { }

  ngOnInit(): void {
  }

}

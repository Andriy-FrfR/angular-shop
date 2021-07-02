import { ProductsService } from './services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-shop';

  constructor(private productsServ: ProductsService) {}

  ngOnInit(): void {
  }
}

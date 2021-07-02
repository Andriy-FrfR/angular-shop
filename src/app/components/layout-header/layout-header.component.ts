import { ProductsService } from './../../services/products.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  products!: Product[];
  searchInput!: FormControl;

  constructor(private productsServ: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.searchInput = new FormControl('');

    this.productsServ.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  sidenavToggle(): void {
    this.sidenav.toggle();
  }

  searchByString(searchStr: string): void {
    this.router.navigate(['search'], { queryParams: { searchStr } });
  }
}

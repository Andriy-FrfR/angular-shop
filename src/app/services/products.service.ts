import { Product } from './../shared/interfaces/product.interface';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<object>(`${environment.dbUrl}/products.json`)
      .pipe(
        map((products) => {
          const mappedProducts = [];

          for (const [id, product] of Object.entries(products)) {
            mappedProducts.push({
              ...product,
              id
            });
          }

          return mappedProducts;
        })
      );
  }

  createProduct(): Observable<Product> {
    return this.http.post<Product>(`${environment.dbUrl}/products.json`, {
      title: 'Title',
      description: 'Some description',
      price: 123,
      img: ['note4.jpg'],
      date: Date.now()
    });
  }
}

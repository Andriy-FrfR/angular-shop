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

  getProductById(id: string): Observable<Product> {
    return this.http.get<any>(`${environment.dbUrl}/products/${id}.json`)
      .pipe(
        map((data: any) => {
          return {id, ...data};
        })
      );
  }

  createProduct(): Observable<Product> {
    return this.http.post<Product>(`${environment.dbUrl}/products.json`, {
      title: 'Title',
      description: 'Some description',
      price: 123,
      img: ['not4.jpg'],
      date: Date.now()
    });
  }
}

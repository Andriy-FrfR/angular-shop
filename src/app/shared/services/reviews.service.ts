import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductReview } from '../interfaces/product-review.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getReviews(productId: string): Observable<ProductReview[]> {
    return this.http.get<object>(`${environment.dbUrl}/products-reviews/${productId}.json`)
      .pipe(
        map((reviews: object) => {
          const mappedReviews = [];

          for (const [id, review] of Object.entries(reviews)) {
            mappedReviews.push({id, ...review});
          }

          return mappedReviews;
        })
      );
  }
}

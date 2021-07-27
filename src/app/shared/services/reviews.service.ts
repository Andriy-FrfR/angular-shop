import { ProductReview } from './../interfaces/product-review.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  reviews$ = new Subject<ProductReview>();

  constructor(private http: HttpClient) { }

  getReviews(productId: string): Observable<ProductReview[]> {
    return this.http.get<object>(`${environment.dbUrl}/products-reviews/${productId}.json`)
      .pipe(
        map((reviews: object | null) => {
          if (!reviews) {
            return [];
          }

          const mappedReviews = [];

          for (const [id, review] of Object.entries(reviews)) {
            mappedReviews.push({id, ...review});
          }

          return mappedReviews;
        })
      );
  }

  createReview(productId: string, review: ProductReview): Observable<any> {
    return this.http.post<any>(`${environment.dbUrl}/products-reviews/${productId}.json`, review);
  }

  reviewAdded(review: ProductReview): void {
    this.reviews$.next(review);
  }
}

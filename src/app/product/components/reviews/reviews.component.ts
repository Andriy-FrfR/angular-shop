import { ProductReview } from './../../../shared/interfaces/product-review.interface';
import { ReviewsService } from './../../../shared/services/reviews.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  reviews: ProductReview[] = [];
  faStar = faStar;
  subscriptions: Subscription[] = [];

  constructor(
      private route: ActivatedRoute,
      private reviewsServ: ReviewsService
    ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.reviewsServ.getReviews(params.id)
          .subscribe((reviews: ProductReview[]) => {
            console.log(reviews);
            this.reviews = reviews;
          });
      })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}

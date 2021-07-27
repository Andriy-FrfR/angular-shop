import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ReviewsService } from './../../../shared/services/reviews.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackdropService } from '../../../shared/services/backdrop.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reviews-form-popup',
  templateUrl: './reviews-form-popup.component.html',
  styleUrls: ['./reviews-form-popup.component.scss']
})
export class ReviewsFormPopupComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  faStar = faStar;
  reviewsForm!: FormGroup;
  rating = 0;
  temporaryRating = 0;
  showReviewRatingValidation = false;
  subscriptions: Subscription[] = [];

  constructor(
    private backdropServ: BackdropService,
    private reviewsServ: ReviewsService,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.reviewsForm = new FormGroup({
      pros: new FormControl(null),
      cons: new FormControl(null),
      comment: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      author: new FormControl(null, Validators.required)
    });
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  closePopup(): void {
    this.backdropServ.hideBackdrop();
  }

  setRating(rating: number): void {
    this.rating = rating;
    this.showReviewRatingValidation = false;
  }

  setTemporaryRating(rating: number): void {
    this.temporaryRating = rating;
  }

  setActualRating(): void {
    this.temporaryRating = this.rating;
  }

  reviewsFormSubmit(): void {
    if (!this.rating) {
      this.showReviewRatingValidation = true;
    }

    if (this.reviewsForm.invalid || !this.rating) {
      this.reviewsForm.markAllAsTouched();
      return;
    }

    const review = {
      rating: this.rating,
      comment: this.reviewsForm.get('comment')?.value,
      author: this.reviewsForm.get('author')?.value,
      pros: this.reviewsForm.get('pros')?.value,
      cons: this.reviewsForm.get('cons')?.value,
      date: new Date()
    };

    this.subscriptions.push(
      this.reviewsServ.createReview(this.product.id || '', review)
        .subscribe(() => {
          this.reviewsServ.reviewAdded(review);
          this.closePopup();
        }, (error: HttpErrorResponse) => {
          if (error.error.error === 'Permission denied') {
            this.closePopup();
            this.authServ.showAuthPopup();
          }
        })
    );
  }
}

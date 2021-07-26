import { BackdropService } from './../../../shared/services/backdrop.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews-form',
  templateUrl: './reviews-form.component.html',
  styleUrls: ['./reviews-form.component.scss']
})
export class ReviewsFormComponent implements OnInit {
  faStar = faStar;
  rating = 0;
  temporaryRating = 0;

  constructor(private backdropServ: BackdropService) { }

  ngOnInit(): void {
  }

  setRating(rating: number): void {
    this.rating = rating;
  }

  setTemporaryRating(rating: number): void {
    this.temporaryRating = rating;
  }

  setActualRating(): void {
    this.temporaryRating = this.rating;
  }

  closePopup(): void {
    this.backdropServ.hideBackdrop();
  }
}

import { SharedModule } from './../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { CharacteristicsComponent } from './components/characteristics/characteristics.component';
import { ProductComponent } from './product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductSideBuyBarComponent } from './components/product-side-buy-bar/product-side-buy-bar.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewsFormPopupComponent } from './components/reviews-form-popup/reviews-form-popup.component';

@NgModule({
  declarations: [
    ProductComponent,
    CharacteristicsComponent,
    ProductSideBuyBarComponent,
    ReviewsComponent,
    ReviewsFormPopupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }

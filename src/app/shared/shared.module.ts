import { RouterModule } from '@angular/router';
import { CheckoutProductComponent } from './components/checkout-product/checkout-product.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByStringPipe } from './pipes/filter-by-string.pipe';
import { NgModule } from '@angular/core';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HideBackdropDirective } from './directives/hide-backdrop.directive';

@NgModule({
  declarations: [
    FilterByCategoryPipe,
    FilterByStringPipe,
    HideBackdropDirective,
    CheckoutProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    FilterByStringPipe,
    FilterByCategoryPipe,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HideBackdropDirective,
    CommonModule,
    CheckoutProductComponent
  ]
})
export class SharedModule {}

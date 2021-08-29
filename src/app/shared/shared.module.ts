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
    HideBackdropDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule
  ],
  exports: [
    FilterByStringPipe,
    FilterByCategoryPipe,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HideBackdropDirective,
    CommonModule
  ]
})
export class SharedModule {}

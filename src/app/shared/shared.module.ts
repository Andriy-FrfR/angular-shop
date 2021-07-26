import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByStringPipe } from './pipes/filter-by-string.pipe';
import { NgModule } from '@angular/core';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    FilterByCategoryPipe,
    FilterByStringPipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    FilterByStringPipe,
    FilterByCategoryPipe,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class SharedModule {}

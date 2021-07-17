import { FilterByStringPipe } from './pipes/filter-by-string.pipe';
import { NgModule } from '@angular/core';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';

@NgModule({
  declarations: [
    FilterByCategoryPipe,
    FilterByStringPipe
  ],
  exports: [
    FilterByStringPipe,
    FilterByCategoryPipe
  ]
})
export class SharedModule {}

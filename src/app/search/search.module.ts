import { SharedModule } from './../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchProductComponent } from './components/search-product/search-product.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchProductComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule
  ]
})
export class SearchModule { }

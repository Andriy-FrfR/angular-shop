import { ProductRoutingModule } from './product-routing.module';
import { CharacteristicsComponent } from './components/characteristics/characteristics.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductComponent } from './product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductSideBuyBarComponent } from './components/product-side-buy-bar/product-side-buy-bar.component';

@NgModule({
  declarations: [
    ProductComponent,
    CharacteristicsComponent,
    ProductSideBuyBarComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    FontAwesomeModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }

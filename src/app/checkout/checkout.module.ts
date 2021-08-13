import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutSideBarComponent } from './components/checkout-side-bar/checkout-side-bar.component';
import { CheckoutProductComponent } from './components/checkout-product/checkout-product.component';

@NgModule({
  declarations: [CheckoutComponent, CheckoutSideBarComponent, CheckoutProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }

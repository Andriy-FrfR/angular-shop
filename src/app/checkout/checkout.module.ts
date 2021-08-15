import { CheckoutRoutingModule } from './checkout-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutSideBarComponent } from './components/checkout-side-bar/checkout-side-bar.component';
import { CheckoutProductComponent } from './components/checkout-product/checkout-product.component';
import { ContactDataFormComponent } from './components/contact-data-form/contact-data-form.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutSideBarComponent,
    CheckoutProductComponent,
    ContactDataFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CheckoutRoutingModule,
    MatRadioModule
  ]
})
export class CheckoutModule { }

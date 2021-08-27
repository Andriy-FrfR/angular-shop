import { CabinetRoutingModule } from './cabinet-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CabinetComponent } from './cabinet.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';



@NgModule({
  declarations: [CabinetComponent, OrdersComponent, WishListComponent],
  imports: [
    SharedModule,
    CabinetRoutingModule
  ]
})
export class CabinetModule { }

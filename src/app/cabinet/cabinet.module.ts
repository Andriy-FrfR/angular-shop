import { CabinetRoutingModule } from './cabinet-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CabinetComponent } from './cabinet.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { PersonalComponent } from './components/personal/personal.component';
import { OrdersItemComponent } from './components/orders-item/orders-item.component';
import { OrdersItemImgComponent } from './components/orders-item-img/orders-item-img.component';



@NgModule({
  declarations: [CabinetComponent, OrdersComponent, WishListComponent, PersonalComponent, OrdersItemComponent, OrdersItemImgComponent],
  imports: [
    SharedModule,
    CabinetRoutingModule
  ]
})
export class CabinetModule { }

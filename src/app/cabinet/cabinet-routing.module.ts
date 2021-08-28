import { PersonalComponent } from './components/personal/personal.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CabinetComponent } from './cabinet.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const childrenRoutes: Routes = [
  {path: 'orders', component: OrdersComponent},
  {path: 'wish-list', component: WishListComponent},
  {path: 'personal', component: PersonalComponent}
];

const routes: Routes = [
  {path: '', component: CabinetComponent, children: childrenRoutes}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CabinetRoutingModule {
}

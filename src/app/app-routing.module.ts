import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: 'search/product/:id', loadChildren: () => import ('./product/product.module').then(m => m.ProductModule)},
  {path: 'search', loadChildren: () => import ('./search/search.module').then(m => m.SearchModule)},
  {path: 'checkout', loadChildren: () => import ('./checkout/checkout.module').then(m => m.CheckoutModule)},
  {path: 'cabinet', loadChildren: () => import ('./cabinet/cabinet.module').then(m => m.CabinetModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

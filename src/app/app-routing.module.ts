import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: 'search/product/:id', loadChildren: () => import ('./product/product.module').then(m => m.ProductModule)},
  {path: 'search', loadChildren: () => import ('./search/search.module').then(m => m.SearchModule)}
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

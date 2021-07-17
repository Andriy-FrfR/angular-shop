import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: 'search/product/:id', loadChildren: () => import ('./product/product.module').then(m => m.ProductModule)},
  {path: 'search', loadChildren: () => import ('./search/search.module').then(m => m.SearchModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    // /でアクセスするとhomemoduleにアクセスする
    path: '',
    // 厳密にhomeページのみヒットするように
    pathMatch: 'full',
    loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

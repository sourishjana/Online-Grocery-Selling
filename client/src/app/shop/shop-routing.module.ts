import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes:Routes=[
  {path:'',component:ShopComponent},
  {path:':id',component:ProductDetailsComponent, data:{breadcrumb:{alias:'productDetails'}}},
  // we take the alias of id as 'productDetails' here to replace id by product name then we set the 'productDetails' to product name in the products-details.component.ts
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ShopRoutingModule { }

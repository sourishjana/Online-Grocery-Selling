import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'shop',loadChildren:()=>import('./shop/shop.module').then(mod=>mod.ShopModule)}, // lazy loading from shop module -> shopModule loaded here automatically
  {path:'**',redirectTo:'',pathMatch:'full'} // if user types a wrong url -> redirect to home 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

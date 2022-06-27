//import { BasketService } from './../../basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct
  quantity=1

  constructor(private shopService:ShopService,
    private activatedRoute:ActivatedRoute,
    private bcService:BreadcrumbService,
    private service:BasketService) {
      this.bcService.set('@productDetails','') // we are setting the value of product details to empty string untill product get loaded
  }

  ngOnInit(): void {
    this.loadProduct()
  }

  addItemToBasket(){
    this.service.addItemToBasket(this.product,this.quantity)
  }

  incrementQuantity(){
    this.quantity++
  }

  decrementQuantity(){
    if(this.quantity>1) this.quantity--
  }

  loadProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product=>{
      this.product=product
      this.bcService.set('@productDetails',product.name) // here we are setting the value of parameter productDetails to product name .... which was set in the shop-routing.module.ts
    },error=>{
      console.log(error)
    })
  }

}

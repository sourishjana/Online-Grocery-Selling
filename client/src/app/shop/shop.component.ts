import { IProduct } from '../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products:IProduct[]
  brands:IBrand[]
  types:IType[]
  totalCount: number
  brandIdSelected:number
  typeIdSelected:number

  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getTypes()
  }

  getProducts(){
    this.shopService.getProducts(this.brandIdSelected,this.typeIdSelected).subscribe(resp=>{
      this.products=resp.data
      this.totalCount=resp.count
    },err=>{
      console.log(err)
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe(resp=>{
      this.brands=[{id:0,name:'All'},...resp]
    },err=>{
      console.log(err)
    })
  }

  getTypes(){
    this.shopService.getTypes().subscribe(resp=>{
      this.types=[{id:0,name:'All'},...resp]
    },err=>{
      console.log(err)
    })
  }

  onBrandSelected(brandId:number){
    this.brandIdSelected=brandId
    this.getProducts()
  }

  onTypeSelected(typeId:number){
    this.typeIdSelected=typeId
    this.getProducts()
  }

}

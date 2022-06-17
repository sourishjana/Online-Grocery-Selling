import { IProduct } from '../shared/models/product';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm // In order to read input from search input 
  products:IProduct[]
  brands:IBrand[]
  types:IType[]
  shopParams=new ShopParams()
  totalCount: number
  sortOptions=[
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High to Low',value:'priceDesc'}
  ]

  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getTypes()
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(resp=>{
      this.products=resp.data
      this.shopParams.pageNumber=resp.pageIndex
      this.shopParams.pageSize=resp.pageSize
      this.totalCount=resp.count
      console.log(resp)
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
    this.shopParams.brandId=brandId
    this.shopParams.pageNumber=1
    this.getProducts()
  }

  onTypeSelected(typeId:number){
    this.shopParams.typeId=typeId
    this.shopParams.pageNumber=1
    this.getProducts()
  }

  onSortSelected(sort:string){
    this.shopParams.sort=sort
    this.getProducts()
  }

  onPageChanged(event:number){
    if(this.shopParams.pageNumber!=event){
      this.shopParams.pageNumber=event
      this.getProducts()
    }
  }

  onSearch(){
    console.log(this.searchTerm.nativeElement.value)
    this.shopParams.search=this.searchTerm.nativeElement.value
    this.shopParams.pageNumber=1
    this.getProducts()
  }

  onReset(){
    this.searchTerm.nativeElement.value=''
    this.shopParams=new ShopParams()
    this.getProducts()
  }

}

import { ShopParams } from './../shared/models/shopParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { IPagination, Pagination } from '../shared/models/pagination';
import {map} from 'rxjs/operators'
import { IProduct } from '../shared/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl=environment.apiUrl
  constructor(private http:HttpClient) { }

  getProducts(shopParams:ShopParams){
    let params=new HttpParams()
    if(shopParams.brandId!==0){
      params=params.append('brandId',shopParams.brandId.toString())
    }
    if(shopParams.typeId!==0){
      params=params.append('typeId',shopParams.typeId.toString())
    }
    if(shopParams.search){
      params=params.append('search',shopParams.search)
    }
    params=params.append('sort',shopParams.sort)
    params=params.append('pageIndex',shopParams.pageNumber.toString())
    params=params.append('pageSize',shopParams.pageSize.toString())

    return this.http.get<Pagination>(this.baseUrl+'products',{observe:'response',params})
      .pipe(
        map(resp=>{
          return resp.body
        })
      )
  }

  getProduct(id:number){
    return this.http.get<IProduct>(this.baseUrl+'products/'+id)
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'products/brands')
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'products/types')
  }
}

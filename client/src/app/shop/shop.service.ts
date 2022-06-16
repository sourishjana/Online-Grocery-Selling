import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { IPagination, Pagination } from '../shared/models/pagination';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl='https://localhost:44332/api/'
  constructor(private http:HttpClient) { }

  getProducts(brandId?:number,typeId?:number){
    let params=new HttpParams()
    if(brandId){
      params.append('brandId',brandId.toString())
    }
    if(typeId){
      params.append('typeId',typeId.toString())
    }
    return this.http.get<Pagination>(this.baseUrl+'products',{observe:'response',params})
      .pipe(
        map(resp=>{
          return resp.body
        })
      )
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'products/brands')
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'products/types')
  }
}

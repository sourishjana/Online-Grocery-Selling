import { IOrder } from './../shared/models/order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl=environment.apiUrl

  constructor(private http:HttpClient) { }

  getAllOrders(){
    return this.http.get<IOrder[]>(this.baseUrl+'orders')
  }

  getOrderById(id:number){
    return this.http.get<IOrder>(this.baseUrl+'orders/'+id)
  }

}

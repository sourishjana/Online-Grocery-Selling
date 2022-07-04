import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders:IOrder[]

  constructor(
    private service:OrdersService,
    private router:Router,
    private bcService:BreadcrumbService) {
      this.bcService.set('@orderDetails','')
    }

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders(){
    this.service.getAllOrders().subscribe(resp=>{
      this.orders=resp
      console.log(resp)
    },err=>{
      console.log(err)
    })
  }

  onClick(id:number){
    console.log(id)
    this.router.navigate(['orders/', id])
  }

}

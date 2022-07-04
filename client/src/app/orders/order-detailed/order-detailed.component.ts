import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  id:number=0
  order:IOrder

  constructor(
    private route:ActivatedRoute,
    private service:OrdersService,
    private bcService:BreadcrumbService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id=params['id']
      //console.log(this.id)
      this.service.getOrderById(this.id).subscribe(resp=>{
        this.order=resp
        this.bcService.set('@orderDetails',"Order# "+this.order.id+" - Pending")
        console.log(this.order)
      },err=>{
        console.log(err)
      })
    });
  }



}

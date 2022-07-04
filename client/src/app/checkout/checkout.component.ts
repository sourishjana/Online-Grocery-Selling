import { IOrder, IOrderItem } from './../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../basket/basket.service';
import { IBasket, IBasketTotals } from '../shared/models/basket';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CheckoutService } from './checkout.service';
import { AccountService } from '../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  basket:IBasket
  basketTotal:IBasketTotals
  // basket$: Observable<IBasket>;
  // basketTotals$: Observable<IBasketTotals>;
  checkOutForm = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    pinCode: ['', Validators.required],
  });
  deliveryForm = this._formBuilder.group({
    deliveryMethod: ['', Validators.required],
  });
  paymentForm = this._formBuilder.group({
    nameOncard: ['', Validators.required],
  });

  constructor(
    private basketService:BasketService,
    private _formBuilder: FormBuilder,
    private checkoutService:CheckoutService,
    private accountService:AccountService,
    private toastrService:ToastrService,
    private router:Router) { }
  deliveryMethods:any

  ngOnInit(): void {
    this.basketService.basket$.subscribe(resp=>{
      this.basket=resp
    })
    this.basketService.basketTotal$.subscribe(resp=>{
      this.basketTotal=resp
    })
    this.getDeliveryMethods()
    this.getAddressFromValues()
  }

  getDeliveryMethods(){
    this.checkoutService.getDeliveryMethods().subscribe(resp=>{
      this.deliveryMethods=resp
      console.log(this.deliveryMethods)
    },err=>{
      console.log(err)
    })
  }

  getAddressFromValues(){
    this.accountService.getUserAddress().subscribe(address=>{
      if(address) this.checkOutForm.patchValue(address)
    },err=>{
      console.log(err)
    })
  }

  saveAddress(){
    console.log(this.checkOutForm.value)
    this.accountService.updateUserAddress(this.checkOutForm.value).subscribe(resp=>{
      this.toastrService.success("Address saved successully")
    },err=>{
      this.toastrService.error(err.message)
      console.log(err)
    })
  }

  setShippingPrice(deliveryMethod:IDeliveryMethod){
    console.log(deliveryMethod,this.deliveryForm.get('deliveryMethod').value)
    this.basketService.setShippingPrice(deliveryMethod)
  }

  submitOrder(){
    const basket=this.basketService.getCurrentBasketValue()
    const orderToCreate=this.getOrderToCreate(basket)
    this.checkoutService.createOrder(orderToCreate).subscribe((order:IOrder)=>{
      this.toastrService.success('Order successfully created')
      this.basketService.deleteBasket(basket)
      console.log(order) 
      const navigationExtras:NavigationExtras={state:order}
      this.router.navigate(['checkout/success'],navigationExtras)
    },err=>{
      this.toastrService.error(err.message)
      console.log(err)
    })
  }

  private getOrderToCreate(basket:IBasket){
    let items:IOrderItem[]=[]
    for(let i of basket.items){
      items.push({
        price:i.price,
        quantity:i.quantity,
        productItemId:i.id,
        productName:i.productName,
        pictureUrl:i.pictureUrl
      })
    }
    return {
      basketId:basket.id,
      deliveryMethod:this.deliveryForm.get('deliveryMethod').value,
      shipToAddress:this.checkOutForm.value,
      orderItems:items
    }
  }

}

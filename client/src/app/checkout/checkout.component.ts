import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../basket/basket.service';
import { IBasket, IBasketTotals } from '../shared/models/basket';
import {FormBuilder, Validators} from '@angular/forms';

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
    zipcode: ['', Validators.required],
  });
  deliveryForm = this._formBuilder.group({
    deliveryMethod: ['', Validators.required],
  });
  paymentForm = this._formBuilder.group({
    nameOncard: ['', Validators.required],
  });

  constructor(private service:BasketService,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.service.basket$.subscribe(resp=>{
      this.basket=resp
    })
    this.service.basketTotal$.subscribe(resp=>{
      this.basketTotal=resp
    })
  }

}

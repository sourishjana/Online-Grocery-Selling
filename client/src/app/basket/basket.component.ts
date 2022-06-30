import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket:IBasket
  basketTotal:IBasketTotals
  // basket$: Observable<IBasket>;
  // basketTotals$: Observable<IBasketTotals>;

  constructor(private service:BasketService) { }

  ngOnInit(): void {
    this.service.basket$.subscribe(resp=>{
      this.basket=resp
    })
    this.service.basketTotal$.subscribe(resp=>{
      this.basketTotal=resp
    })
  }

  removeBasketItem(item:IBasketItem){
    this.service.removeItemFromBasket(item)
  }

  incrementItemQuantity(item:IBasketItem){
    this.service.incrementItemQuantity(item)
  }

  decrementItemQuantity(item:IBasketItem){
    this.service.decrementItemQuantity(item)
  }

}

import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Ecom';
  constructor(private basketService:BasketService,private accountService:AccountService) {}

  ngOnInit():void{
    this.loadBasket()
    this.loadCurrentUser()
  }

  loadCurrentUser(){
    const token=localStorage.getItem('token')
    if(token){
      this.accountService.loadCurrentUser(token).subscribe(resp=>{
        console.log('use loaded',resp)
      },err=>{
        console.log(err)
      })
    }
  }

  loadBasket(){
    const basketId=localStorage.getItem('basket_id')
    if(basketId){
      this.basketService.getBasket(basketId)
    }
  }
}

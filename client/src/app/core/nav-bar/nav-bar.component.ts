import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket:IBasket
  //basket$: Observable<IBasket> // alternative method

  constructor(private service:BasketService) { }

  ngOnInit(): void {
    //this.basket$=this.service.basket$ // this is also a method
    this.service.basket$.subscribe(resp=>{
      this.basket=resp
    })
  }

}

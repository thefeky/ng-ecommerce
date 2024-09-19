import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 cart = new BehaviorSubject<number[]>([])
  constructor() { }
  getCart(){
    return this.cart.asObservable();
  }
  updateCart(newVal: number[]){
    return this.cart.next(newVal)
  }
}

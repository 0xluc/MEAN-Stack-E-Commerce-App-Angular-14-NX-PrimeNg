import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  initCartLocalStorage(){
    const initialCart = {
      items:[]
    }
    localStorage.setItem(CART_KEY, JSON.stringify(initialCart))
  }
  getCart(): Cart{
    const cartJson: string = localStorage.getItem(CART_KEY)!
    const cart: Cart = JSON.parse(cartJson)
    return cart
  }
  setCartItem(cartItem: CartItem): Cart|undefined{
    if(localStorage.getItem(CART_KEY) != null && localStorage.getItem(CART_KEY) != undefined){
      const cart = this.getCart()
      cart.items!.push(cartItem)
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
      return cart
    }
    return undefined

  }
}

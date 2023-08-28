import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject} from 'rxjs';
import { MessageService } from 'primeng/api';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.getCart())

  constructor(
    private messageService: MessageService
  ) { }
  initCartLocalStorage(){
    const cart: Cart = this.getCart()
    if(!cart){
      const initialCart = {
        items:[]
      }
      localStorage.setItem(CART_KEY, JSON.stringify(initialCart))
    }
  }
  getCart(): Cart{
    const cartJson: string = localStorage.getItem(CART_KEY)!
    const cart: Cart = JSON.parse(cartJson)
    return cart
  }
  setCartItem(cartItem: CartItem, updateCardItem?: boolean): Cart|undefined{
    if(localStorage.getItem(CART_KEY) != null && localStorage.getItem(CART_KEY) != undefined){
      const cart = this.getCart()
      const cartItemExist = cart.items!.find((item)=> item.productId === cartItem.productId)
      if(cartItemExist){
        cart.items!.map((item): CartItem | undefined=>{
          if(item.productId === cartItem.productId){
            if(updateCardItem){
              item.quantity = cartItem.quantity
            } else{
              item.quantity! += cartItem.quantity!
            }
            this.messageService.add({severity:'success', summary:'Success', detail:'Item added to cart'})
            return item
          }
          return undefined
        })
      } else{
        cart.items!.push(cartItem)
        this.messageService.add({severity:'success', summary:'Success', detail:'Item added to cart'})
      }
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
      this.cart$.next(cart)
      return cart
    }
    return undefined

  }
  deleteCartItem(productId: number){
    const cart = this.getCart()
    const newCart = cart.items!.filter(item => item.productId !== productId)
    cart.items = newCart
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
    this.cart$.next(cart)
    this.messageService.add({severity:'success', summary:'Success', detail:'Item removed from cart'})
  }
  emptyCart(){
    const initialCart = {
      items:[]
    }
    localStorage.setItem(CART_KEY, JSON.stringify(initialCart))
    this.cart$.next(initialCart)
  }
}

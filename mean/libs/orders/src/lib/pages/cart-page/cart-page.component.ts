import { OrdersService, ProductsService } from '@mean/products';
import { CartItem, CartItemDetailed, CartService } from '@mean/orders';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy{
  cartItemsDetailed: CartItemDetailed[] = []
  cartCount = 0
  endSub$: Subject<void> = new Subject()
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) { }
  ngOnInit(): void {
    this._getCartDetails()
  }
  ngOnDestroy(): void {
    this.endSub$.next();
    this.endSub$.complete();
  }
  continueShopping(): void {
    this.router.navigate(['/products']);
  }
  removeFromCart(cartItem: CartItemDetailed): void {
    this.cartService.deleteCartItem(cartItem.product.id!)
  }
  _getCartDetails(): void {
    this.cartService.cart$.pipe(takeUntil(this.endSub$)).subscribe((cart) => {
      this.cartItemsDetailed = []
      this.cartCount = cart?.items?.length ?? 0
      cart?.items?.forEach((cartItem:CartItem)=> {
        this.ordersService.getProduct(cartItem.productId!.toString()).subscribe((responseProduct) => {
          this.cartItemsDetailed.push({
            product: responseProduct,
            quantity: cartItem.quantity
          })
        })
      });
    })
  }
  updateCartItemQuantity(event:any, cartItem: CartItemDetailed){
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true)
  }
}

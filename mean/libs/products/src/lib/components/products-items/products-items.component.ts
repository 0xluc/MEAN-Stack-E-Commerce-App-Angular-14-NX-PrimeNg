import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartItem, CartService } from '@mean/orders'

@Component({
  selector: 'products-product-item',
  templateUrl: './products-items.component.html',
  styles: [
  ]
})
export class ProductsItemsComponent implements OnInit{
  @Input() product:Product;

  constructor(
    private cartService: CartService
  ) {

  }

  ngOnInit(): void {
  }
  addProductToCart(){
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit{
  quantity = 0
  cartCount: number = 0
  constructor(
    private router: Router
  ) { }
  ngOnInit(): void {

  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
  removeFromCart(): void {

  }
}

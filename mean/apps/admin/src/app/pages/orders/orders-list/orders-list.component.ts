import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@mean/products';
import { ORDER_STATUS } from '../order.constants';


@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = []
  orderStatus:any = ORDER_STATUS

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this._getOrders()
  }
  deleteOrder(order: Order){

  }
  showOrder(order: Order){
    this.router.navigateByUrl(`orders/${order.id}`)
  }
  _getOrders(){
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders
    })
  }
}

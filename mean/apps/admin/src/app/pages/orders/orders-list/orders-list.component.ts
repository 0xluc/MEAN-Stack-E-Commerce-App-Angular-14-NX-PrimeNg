import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@mean/products';
import { ORDER_STATUS } from '../order.constants';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit, OnDestroy{

  orders: Order[] = []
  orderStatus:any = ORDER_STATUS
  endSub$ = new Subject<void>();

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this._getOrders()
  }
  ngOnDestroy(): void {
   this.endSub$.next()
   this.endSub$.complete()
  }
  deleteOrder(order: Order){

  }
  showOrder(order: Order){
    this.router.navigateByUrl(`orders/${order.id}`)
  }
  _getOrders(){
    this.ordersService.getOrders().pipe(takeUntil(this.endSub$)).subscribe((orders) => {
      this.orders = orders
    })
  }
}

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@mean/products';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {


  order: Order
  orderStatuses:any[] = []

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this._mapOrderStatus()
      this._getOrder()
  }
  stringToFloat(value: string){
    return parseFloat(value)
  }
  private _mapOrderStatus(){
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    })
  }
  private _getOrder(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.ordersService.getOrder(params.id).subscribe(order => {
          console.log(order)
          this.order = order
        })
      }
    })
  }
  
}

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@mean/products';
import { ORDER_STATUS } from '../order.constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {


  order: Order
  orderStatuses:any[] = []
  selectedStatus: any

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
      this._mapOrderStatus()
      this._getOrder()
  }
  stringToFloat(value: string){
    return parseFloat(value)
  }
  onStatusChange(event:any){
    this.ordersService.updateOrder({status: event.value}, this.order.id!).subscribe(order => {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Order updated'})
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Order not updated'})
    })
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
          this.order = order
          this.selectedStatus = order.status
        })
      }
    })
  }


}

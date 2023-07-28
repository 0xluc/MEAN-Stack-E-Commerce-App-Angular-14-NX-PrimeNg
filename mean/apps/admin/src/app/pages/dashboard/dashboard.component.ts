import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService, ProductsService, UsersService } from '@mean/products';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy{

  statistics:number[] = [];
  endSub$ = new Subject<void>();
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private usersService: UsersService
  ){}

  ngOnInit(): void {
    forkJoin([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).pipe(takeUntil(this.endSub$)).subscribe((values) => {
      this.statistics = values;
      console.log(this.statistics)
    })
  }
  ngOnDestroy(): void {
   this.endSub$.next()
   this.endSub$.complete()
  }
  stringToFloat(value: string){
    return parseFloat(value)
  }
}

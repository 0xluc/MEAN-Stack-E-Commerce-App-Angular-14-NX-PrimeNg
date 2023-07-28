import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order } from '../models/order';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl = environment.apiUrl + 'orders';
  constructor( private http: HttpClient) {
  }
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
  updateOrder(orderStatus: {status: string}, orderId: number): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, orderStatus);
  }
  deleteOrder(id: string): Observable<Object> {
    return this.http.delete<Order>(`${this.apiUrl}/${id}`);
  }
  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrl}/get/count`)
      .pipe(map((objectValue: any) => objectValue.count));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrl}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }
}

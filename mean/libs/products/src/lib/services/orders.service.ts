import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order);
  }
  deleteOrder(id: string): Observable<Object> {
    return this.http.delete<Order>(`${this.apiUrl}/${id}`);
  }
}

import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = environment.apiUrl + 'products';
  constructor( private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData);
  }
  updateProduct(product: FormData, id: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product); 
  }
  deleteProduct(id: string): Observable<Object> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}


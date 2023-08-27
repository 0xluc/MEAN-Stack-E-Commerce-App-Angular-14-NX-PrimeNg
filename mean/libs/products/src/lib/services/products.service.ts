import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = environment.apiUrl + 'products';
  constructor( private http: HttpClient) {}
  getProducts(categoriesFilter?: number[]): Observable<Product[]> {
    let params = new HttpParams()
    if(categoriesFilter){
      params = params.append('categories', categoriesFilter.toString())
    }
    return this.http.get<Product[]>(this.apiUrl, { params });
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
 getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrl}/get/count`)
      .pipe(map((objectValue: any) => objectValue.count));
  }
  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/get/featured/${count}`);
  }
}


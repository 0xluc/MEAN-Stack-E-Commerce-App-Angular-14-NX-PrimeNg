import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiUrl = environment.apiUrl + 'categories';
  constructor( private http: HttpClient) {
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category); 
  }
  deleteCategory(id: string): Observable<Object> {
    return this.http.delete<Category>(`${this.apiUrl}/${id}`);
  }
 
}

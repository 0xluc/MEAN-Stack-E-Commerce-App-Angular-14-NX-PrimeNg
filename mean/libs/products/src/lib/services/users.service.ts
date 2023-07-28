import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.apiUrl + 'users';
  constructor( private http: HttpClient) {
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user); 
  }
  deleteUser(id: string): Observable<Object> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }
  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrl}/get/count`)
      .pipe(map((objectValue: any) => objectValue.count));
  }
}

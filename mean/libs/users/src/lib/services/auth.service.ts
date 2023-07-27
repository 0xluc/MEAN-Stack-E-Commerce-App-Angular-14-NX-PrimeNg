import { HttpClient } from '@angular/common/http';
import { User } from './../../../../products/src/lib/models/user';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/enviroment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password });
  }
}

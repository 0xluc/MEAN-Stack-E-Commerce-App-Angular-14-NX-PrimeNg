import { HttpClient } from '@angular/common/http';
import { User } from './../../../../products/src/lib/models/user';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/enviroment.prod';
import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient, private localStorageService: LocalstorageService, private router: Router) { }
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password });
  }
  logout(){
    this.localStorageService.removeToken()
    this.router.navigate(['/login'])
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }


  signin(login: Login) {
    this.http.post<{token: string}>(`${this.baseUrl}signin`, login).subscribe({
      next: response => console.log(response),
      error: err => alert(err.message)
    });
    
  }
}

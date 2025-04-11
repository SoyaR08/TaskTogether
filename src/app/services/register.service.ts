import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register } from '../interfaces/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http: HttpClient = inject(HttpClient);

  registerUser (register: Register): Observable<any> {
    return this.http.post("http://localhost:8080/register", register)

  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Login } from '../interfaces/login';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/';
  private isLogedSignal = signal<boolean>(false);
  constructor(private http: HttpClient) {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      this.isLogedSignal.set(true)
    }
  }

  get isLoged() {
    return this.isLogedSignal.asReadonly();
  }

  signin(login: Login) {
    this.http.post<{token: string}>(`${this.baseUrl}signin`, login).subscribe({
      next: response => {
        console.log(response.token.split('Bearer '));
        const token = response.token.split('Bearer ')[1];
        localStorage.setItem('token', token);
        this.isLogedSignal.set(true);
        Swal.fire({
          title: '¡Exito!',
          text: 'Sesión iniciada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      },
      error: err => alert(err.message)
    });
    
  }
}

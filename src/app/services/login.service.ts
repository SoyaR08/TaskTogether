import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { Login } from '../interfaces/login';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { UserMinimumDetails } from '../interfaces/user-minimum-details';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/';
  private isLogedSignal = signal<boolean>(false);
  private userDetails = signal<UserMinimumDetails>({email: '', role: ''});
  private router: Router = inject(Router)
  constructor(private http: HttpClient) {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      this.isLogedSignal.set(true)
      this.userDetails.set(jwtDecode<UserMinimumDetails>(token));
      
    }
  }

  get isLoged() {
    return this.isLogedSignal.asReadonly();
  }

  get user() {
    return this.userDetails.asReadonly();
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
        });
        this.router.navigate(['/dashboard'])
      },
      error: err => {
        Swal.fire({
          title: 'Error al iniciar sesión',
          text: 'El correo electrónico o contraseña son incorrectos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
    
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogedSignal.set(false);
    this.userDetails.set({email: '', role: ''});
    this.router.navigate(['/login'])
  }

  isAdmin() {
    return this.userDetails().role === 'GEN_ADMIN';
  }
}

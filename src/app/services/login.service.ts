import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { Login } from '../interfaces/login';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { UserMinimumDetails } from '../interfaces/user-minimum-details';
import { Router } from '@angular/router';
import { DecodedToken } from '../interfaces/decoded-token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'https://tasktogether-api.onrender.com/';
  private isLogedSignal = signal<boolean>(false);
  userDetails = signal<UserMinimumDetails>({ id: 0, name: '', email: '', role: '', address: '', job: '' });
  private router: Router = inject(Router)

  constructor(private http: HttpClient) {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      this.isLogedSignal.set(true)
      this.findUserByHisMail(jwtDecode<DecodedToken>(token).email);

    }
  }

  get isLoged() {
    return this.isLogedSignal.asReadonly();
  }

  get user() {
    return this.userDetails.asReadonly();
  }

  signin(login: Login) {
    this.http.post<{ token: string }>(`${this.baseUrl}signin`, login).subscribe({
      next: response => {
        //console.log(response.token.split('Bearer '));
        const token = response.token.split('Bearer ')[1];
        localStorage.setItem('token', token);
        this.isLogedSignal.set(true);
        Swal.fire({
          title: '¡Exito!',
          text: 'Sesión iniciada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.findUserByHisMail(jwtDecode<DecodedToken>(token).email);
        this.router.navigate(['/dashboard'])
      },
      error: () => {
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
    this.userDetails.set({ id: 0, name: '', email: '', role: '', address: '', job: '' });
    this.router.navigate(['/login'])
  }

  isAdmin() {
    return this.userDetails().role === 'GEN_ADMIN';
  }

  findUserByHisMail(email: string) {

    const token: string | null = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.get<UserMinimumDetails>(`${this.baseUrl}api/users/${email}`, { headers })
      .subscribe({
        next: response => {
          this.userDetails.set(response)
        },
        error: err => console.log(err)
      })
  }

  editProfile(profile: FormData) {
    const token: string | null = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    this.http.put<any>(`${this.baseUrl}users/${this.userDetails().id}`, profile, {headers})
    .subscribe({
      next: response => Swal.fire({
        title: '¡Exito!',
        text: 'Los cambios se han guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'

      }), error: err => Swal.fire({
        title: '¡Error!',
        text: err.error,
        icon: 'error',
        confirmButtonText: 'Aceptar'

      })
    })
  }
}

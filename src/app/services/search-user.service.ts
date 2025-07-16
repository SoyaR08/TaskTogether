import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserMinimumDetails } from '../interfaces/user-minimum-details';

@Injectable({
  providedIn: 'root'
})
export class SearchUserService {

  private http: HttpClient = inject(HttpClient);
  private url: string = 'https://tasktogether-api.onrender.com/users'
  private userSignal = signal<UserMinimumDetails[]>([])

  get user() {
    return this.userSignal.asReadonly();
  }

  findUserByMail(email: string) {
    if (email !== '' && email !== ' ' && email.length >= 3) {
      const token = localStorage.getItem('token')
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      this.http.get<UserMinimumDetails[]>(`${this.url}/find?email=${email}`, {headers})
      .subscribe({
        next: user => this.userSignal.set(user),
        error: err => alert('Error fetching user: ' + err.message)
      })

    } else {
      this.userSignal.set([]);
    }
  }

  clearSignal() {
    this.userSignal.set([]);
  }
  

}

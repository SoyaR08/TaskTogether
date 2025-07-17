import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { UserInfoPresentation } from '../interfaces/UserInfoPresentation';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/';
  private http: HttpClient = inject(HttpClient);
  private users = signal<UserInfoPresentation[]>([])
  private loadingData = signal<boolean>(true);

  get isLoading() {
    return this.loadingData.asReadonly()
  }

  getAllUsers() {

    const token: string | null = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.get<UserInfoPresentation[]>(`${this.baseUrl}users`, { headers, withCredentials: true })
    .subscribe({
      next: response => {
        this.users.set(response);
        this.loadingData.set(false);
      },
      error: err => console.error(err.message)
    })
  }

  filteredData(criteria?: string, orderCriteria?: string): UserInfoPresentation[] {
    switch (criteria) {
      case 'GEN_ADMIN':
      case 'USER':
        return this.orderData(orderCriteria).filter(user => user.role === criteria);
      default:
        return this.orderData(orderCriteria);
    }
  }

  orderData(criteria?: string): UserInfoPresentation[] {
    switch (criteria) {
      case 'name_asc':
        return this.users().sort((user1, user2) => user1.name.localeCompare(user2.name))
      case 'name_desc':
        return this.users().sort((user1, user2) => user2.name.localeCompare(user1.name))
      case 'mail_asc':
        return this.users().sort((user1, user2) => user1.email.localeCompare(user2.email))
      case 'mail_desc':
        return this.users().sort((user1, user2) => user2.email.localeCompare(user1.email))
      default:
        return this.users().sort((user1, user2) => user1.id.valueOf() - user2.id.valueOf());
    }
  }

  changeRole(object: {id: Number, newRole: string}) {
    const token: string | null = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.put<{id: Number, newRole: string}>(`${this.baseUrl}users/role/${object.id}`, object, {headers})
  }

}

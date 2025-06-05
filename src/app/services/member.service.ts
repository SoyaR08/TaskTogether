import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { NewMember } from '../interfaces/new-member';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseUrl: string = 'http://localhost:8080/members';
  private projectsSignal = signal<{id: Number, name: string}[]>([]);
  constructor(private http: HttpClient) { }

  get projects() {
    return this.projectsSignal.asReadonly();
  }

  getProjectsByMemberId(id: Number) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<{id: Number, name: string}[]>(`${this.baseUrl}/list?userId=${id}`, {headers})
    .subscribe({
      next: response => {
        this.projectsSignal.set(response);
      }, error: error => Swal.fire({
        'title': 'Error',
        'text': 'Error al obtener los proyectos del miembro' + error.message,
        'icon': 'error'
      })
    })
  }

  addMemberProject(member: NewMember): void {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.post<{message: string}>(`${this.baseUrl}`, member, {headers})
    .subscribe({
      next: response => Swal.fire({
        'title': 'Éxito',
        'text': response.message,
        'icon': 'success'
      }),
      error: error => Swal.fire({
        'title': 'Error',
        'text': 'Error al añadir el miembro al proyecto: ' + error.message,
        'icon': 'error'
      })
    })
  }

}

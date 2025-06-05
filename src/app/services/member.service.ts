import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { NewMember } from '../interfaces/new-member';
import { UserMember } from '../interfaces/user/user-member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseUrl: string = 'http://localhost:8080/members';
  private projectsSignal = signal<{id: Number, name: string}[]>([]);
  private membersSignal = signal<UserMember[]>([]);
  constructor(private http: HttpClient) { }

  get projects() {
    return this.projectsSignal.asReadonly();
  }

  get members() {
    return this.membersSignal.asReadonly();
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

  getMembersByProjectId(projectId: Number) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.get<UserMember[]>(`${this.baseUrl}/listmembers?projectId=${projectId}`, {headers})
    .subscribe({
      next: response => this.membersSignal.set(response),
      error: error => Swal.fire({
        'title': 'Error',
        'text': 'Error al obtener los miembros del proyecto: ' + error.message,
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

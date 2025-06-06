import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AssignTaskService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8080/assigntask';


  assignTask(userId: Number, taskId: Number) {

    const token: string | null = localStorage.getItem('token');
    if (!token) {
      alert('No se ha encontrado el token de autenticación');
      return;
    }
    const assignment = { 'userId': userId, 'taskId': taskId };
    alert(JSON.stringify(assignment));
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post<{ message: string }>(`${this.baseUrl}`, assignment, { headers })
      .subscribe({
        next: response => {
          Swal.fire({
            'title': 'Tarea',
            'icon': 'success',
            'text': response.message
          })
        },
        error: error => {
          console.log(error)
          Swal.fire({
            'title': 'Error',
            'icon': 'error',
            'text': error.error.message
          });
        }
      });

  }
}

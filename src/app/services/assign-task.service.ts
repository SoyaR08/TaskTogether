import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AssignTaskService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8080/assigntask';
  private userTasks = signal<any[]>([]);
  private filterSignal = signal<number>(3);

  get tasks() {
    return this.userTasks.asReadonly();
  }

  setFilter(priority: number) {
    this.filterSignal.set(priority);
  }

  filteredData(filterCondition?: number) {
    switch (filterCondition) {
      case 0:
        return this.userTasks().filter(t => t.priority === 0);
      case 1:
        return this.userTasks().filter(t => t.priority === 1);
      case 2:
        return this.userTasks().filter(t => t.priority === 2);
      default:
        return this.userTasks();
    }
  }


  getUserTasks() {
    const token: string | null = localStorage.getItem('token');
    if (!token) {
      alert('No se ha encontrado el token de autenticación');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.get<any[]>(`${this.baseUrl}`, { headers })
      .subscribe({
        next: response => this.userTasks.set(response),
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

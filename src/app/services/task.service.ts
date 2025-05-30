import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AddTask } from '../interfaces/add-task';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8080/tasks';

  addTask(task: AddTask) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.post<{message: string}>(`${this.baseUrl}/add`, task, { headers})
    .subscribe({
      next: response => Swal.fire({
        'title': 'Tarea añadida',
        'icon': 'success',
        'text': response.message
      }),
      error: error => {
        console.error('Error al añadir la tarea:', error);
        alert('Error al añadir la tarea. Por favor, inténtelo de nuevo más tarde. '+error.message);
      }
    })

  }
}

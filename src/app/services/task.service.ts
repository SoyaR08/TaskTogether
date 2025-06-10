import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddTask } from '../interfaces/add-task';

import { Task } from '../interfaces/task';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8080/tasks';
  private taskAddedSubject = new Subject<Task>();
  private activeTasksSignal = signal<{id: Number, name: string}[]>([]);

  get taskAdded$() {
    return this.taskAddedSubject.asObservable();
  }

  get activeTasks() {
    return this.activeTasksSignal.asReadonly();
  }

  getActiveTasks(project: Number) {

    const token = localStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.get<{id: Number, name: string}[]>(`${this.baseUrl}/project?projectId=${project}`, {headers})
    .subscribe({
      next: response => this.activeTasksSignal.set(response),
      error: error => Swal.fire({
        'title': 'Error al obtener las tareas activas',
        'icon': 'error',
        'text': `Error al obtener las tareas activas: ${error.message}`
      })
    })

  }

  addTask(task: AddTask): Observable<Task> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.post<Task>(`${this.baseUrl}`, task, { headers});

  }

  changeTaskStatus(taskId: Number) {
    const token = localStorage.getItem('token');
  }
}

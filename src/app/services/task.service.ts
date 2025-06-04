import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AddTask } from '../interfaces/add-task';

import { Task } from '../interfaces/task';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8080/tasks';
  private taskAddedSubject = new Subject<Task>();

  get taskAdded$() {
    return this.taskAddedSubject.asObservable();
  }

  addTask(task: AddTask): Observable<Task> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.post<Task>(`${this.baseUrl}`, task, { headers});

  }
}

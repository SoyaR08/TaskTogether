import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Dashboard } from '../interfaces/dashboard';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class ProjectdashboardService {

  private dashboardUrl: string = 'http://localhost:8080/projects/dashboard';
  private http: HttpClient = inject(HttpClient);
  private projectDashboard = signal<Dashboard>({
    projectId: 0,
    name: '',
    members: [],
    pending: [],
    progress: [],
    finished: []
  })

  get dashboard() {
    return this.projectDashboard.asReadonly();
  }

  setDashboard(task: Task): void {
    // Implement the logic to update the dashboard with the new task
    switch (task.status) {
      case 0:
        this.projectDashboard.update(tasks => {
          return {
            ...tasks,
            pending: [...tasks.pending, task]
          }
        })
        break;
      case 1:
        this.projectDashboard.update(tasks => {
          return {
            ...tasks,
            progress: [...tasks.progress, task]
          }
        })
        break;
      case 2:
        this.projectDashboard.update(tasks => {
          return {
            ...tasks,
            finished: [...tasks.finished, task]
          }
        })
        break;
    }
  }

  public getDashboard(projectId: Number, token: string) {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    this.http.get<Dashboard>(`${this.dashboardUrl}/${projectId}`, {headers})
    .subscribe({
      next: response => this.projectDashboard.set(response),
      error: err => alert('Ha ocurrido un error inesperado: '+err.message)
    })
  }


}

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

  /**
   * Función que añade una nueva tarea al dashboard del proyecto
   * @param task La tarea que acabamos de añadir
   */
  setDashboard(task: Task): void {
   
    //Hago un switch por el estado para añadir a una lista u otra y una vez hecho, ordeno por prioridad
    switch (task.status) {
      case 0:
        this.projectDashboard.update(tasks => {
          return {
            ...tasks,
            pending: [...tasks.pending, task].sort((a, b) => b.priority - a.priority)
          }
        })
        break;
      case 1:
        this.projectDashboard.update(tasks => {
          return {
            ...tasks,
            progress: [...tasks.progress, task].sort((a, b) => b.priority - a.priority)
          }
        })
        break;
      case 2:
        this.projectDashboard.update(tasks => {
          return {
            ...tasks,
            finished: [...tasks.finished, task].sort((a, b) => b.priority - a.priority)
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

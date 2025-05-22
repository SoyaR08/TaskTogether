import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Dashboard } from '../interfaces/dashboard';

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

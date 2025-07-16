import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { InitialDashboard } from '../interfaces/general/dashboard';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = "https://tasktogether-api.onrender.com/users";
  private statsSignal = signal<InitialDashboard>({
    activeProjectsNumber: 0,
    progressTasksNumber: 0,
    toExpireTasksNumber: 0,
    progressTasks: [],
    toExpireTasks: [],
    recentProyects: []
  })

  get stats() {
    return this.statsSignal.asReadonly();
  }


  getUserStats() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.get<InitialDashboard>(`${this.baseUrl}/dashboard`, {headers})
    .subscribe({
      next: response => {
        this.statsSignal.set(response);
        console.log(response)
      },
      error: err => alert(err.error)
    })

  }

}

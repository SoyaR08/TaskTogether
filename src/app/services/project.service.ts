import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { AddProject } from '../interfaces/add-project';
import Swal from 'sweetalert2';
import { Project } from '../interfaces/project';
import { ProjectPage } from '../interfaces/project-page';
import { Record } from '../interfaces/record';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'https://tasktogether-api.onrender.com/projects'
  private activeProjects = signal<ProjectPage>({
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      offset: 0,
      paged: false,
      unpaged: true
    },
    last: false,
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true
    },
    first: true,
    numberOfElements: 0,
    empty: true
  });
  private isLoading = signal<boolean>(true);
  private http: HttpClient = inject(HttpClient)
  private historical = signal<Record[]>([])

  get loading() {
    return this.isLoading.asReadonly();
  }

  get userProjects() {
    return this.activeProjects.asReadonly();
  }

  get records() {
    return this.historical.asReadonly();
  }

  getProjects(pageNumber: number) {
    const token: string | null = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    this.http.get<ProjectPage>(`${this.apiUrl}?pageNumber=${pageNumber}`, { headers })
      .subscribe({
        next: response => {
          this.activeProjects.set(response);
          this.isLoading.set(false);
        },
        error: err => {
          this.isLoading.set(false);
          alert('Error al obtener los proyectos ' + err)
        }
      })
  }

  addProject(project: AddProject) {
    this.http.post<Project>(`${this.apiUrl}/add`, project)
      .subscribe({
        next: response => {
          Swal.fire({
            title: '¡Proyecto creado con éxito!',
            text: `Se ha creado el proyecto ${response.name}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => this.getProjects(1));
        },
        error: err => alert(err)
      })
  }

  finishAProject(id: Number) {

    const token: string | null = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    const newStatus = {
      "status": "FINISHED"
    }

    this.http.patch<Project>(`${this.apiUrl}/${id}`, newStatus, { headers })
      .subscribe({
        next: response => {
          Swal.fire({
            title: '¡Proyecto finalizado con éxito!',
            text: `Se ha finalizado el proyecto ${response.name}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.getProjects(1);
        },
        error: err => Swal.fire({
            title: 'Error',
            text: `No se ha podido finalizar el proyecto por el siguiente motivo: ${err.message || err.error}`,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
      })
  }

  loadHistorical(projectId: Number) {

    const token: string | null = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.get<Record[]>(`${this.apiUrl}/historical/${projectId}`, {headers})
      .subscribe({
        next: response => this.historical.set(response),
        error: err => alert(err.message)
      })
  }

}

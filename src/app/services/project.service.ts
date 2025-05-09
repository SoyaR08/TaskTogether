import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { AddProject } from '../interfaces/add-project';
import Swal from 'sweetalert2';
import { Project } from '../interfaces/project';
import { ProjectPage } from '../interfaces/project-page';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:8080/projects'
  private activeProjects = signal<ProjectPage>({content: []});
  private isLoading = signal<boolean>(true);
  private http: HttpClient = inject(HttpClient)

  get userProjects() {
    return this.activeProjects.asReadonly();
  }

  getProjects(pageNumber: number) {
    const token: string | null = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    this.http.get<ProjectPage>(`${this.apiUrl}?pageNumber=${pageNumber}`, {headers})
    .subscribe({
      next: response => {
        this.activeProjects.set(response);
        this.isLoading.set(false);
      }, 
      error: err => {
        this.isLoading.set(false);
        alert('Error al obtener los proyectos '+err)
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
                });
      },
      error: err => alert(err)
    })
  }
}

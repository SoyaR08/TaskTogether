import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AddProject } from '../interfaces/add-project';
import Swal from 'sweetalert2';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:8080/projects/'
  private http: HttpClient = inject(HttpClient)

  addProject(project: AddProject) {
    this.http.post<Project>(`${this.apiUrl}add`, project)
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

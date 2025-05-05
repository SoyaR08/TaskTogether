import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AddProject } from '../interfaces/add-project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:8080/projects/'
  private http: HttpClient = inject(HttpClient)

  addProject(project: AddProject) {
    this.http.post(`${this.apiUrl}add`, project)
    .subscribe({
      next: response => alert('Chachi'),
      error: err => alert(err)
    })
  }
}

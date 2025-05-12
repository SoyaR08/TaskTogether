import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ProjectService } from '../../services/project.service';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-projects',
  imports: [NgFor],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.css'
})
export class ListProjectsComponent implements OnInit{

  pageNumber: number = 1;
  login: LoginService = inject(LoginService);
  project: ProjectService = inject(ProjectService);

  ngOnInit(): void {
    this.project.getProjects(this.pageNumber);
  }


  finish(id: Number) {
    Swal.fire({
      title: '¿Está seguro de finalizar este proyecto?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#FF9F1C',
      showCancelButton: true
    })
    .then(() => this.project.finishAProject(id));
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ProjectService } from '../../services/project.service';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { RangePipe } from '../../pipes/range.pipe';

@Component({
  selector: 'app-list-projects',
  imports: [NgFor, RouterLink, RangePipe, NgClass, NgIf],
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

  changePage(page: number) {
    this.pageNumber = page;
    this.project.getProjects(this.pageNumber);
  }

  formatNames(name: string): string {
    return name.toLowerCase().replaceAll(" ", "-");
  }
}

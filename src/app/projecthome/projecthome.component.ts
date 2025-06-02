import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HistorialComponent } from '../modals/historial/historial.component';
import { ProjectdashboardService } from '../services/projectdashboard.service';
import { NgFor } from '@angular/common';
import { AddtaskComponent } from '../modals/addtask/addtask.component';
import { TaskComponent } from '../partials/task/task.component';
import { AssignTaskComponent } from '../modals/assign-task/assign-task.component';
import { LoginService } from '../services/login.service';
import { AssignTaskService } from '../services/assign-task.service';


@Component({
  selector: 'app-projecthome',
  imports: [NgFor, TaskComponent],
  templateUrl: './projecthome.component.html',
  styleUrl: './projecthome.component.css'
})
export class ProjecthomeComponent implements OnInit{

  @Input() projectName: string = '';
  dialog: MatDialog = inject(MatDialog)
  dashboardService: ProjectdashboardService = inject(ProjectdashboardService);


  ngOnInit(): void {
      const token: string | null = localStorage.getItem('token');
      if (token) {
        this.dashboardService.getDashboard(this.unFormatName(this.projectName), token);
      } else {
        alert('No se ha encontrado el token de autenticación');
      }
  }


  openHistorial() {
    this.dialog.open(HistorialComponent, {
      //panelClass: 'custom-dialog-container', Esto le pasa una clase css default
      height: '500px',
      width: '830px',
      data: {
        projectId: this.unFormatName(this.projectName)
      }
    })
  }

  createTask() {
    this.dialog.open(AddtaskComponent, {
      height: '650px',
      width: '830px',
      data: {
        projectId: this.unFormatName(this.projectName)
      }
    })
  }

  assignTask() {
    this.dialog.open(AssignTaskComponent, {
      height: '650px',
      width: '830px',
      data: {
        projectId: this.unFormatName(this.projectName)
      }
    })
  }

  unFormatName(name: string): Number {
    return Number.parseInt(name.split("-")[0])
  }
}

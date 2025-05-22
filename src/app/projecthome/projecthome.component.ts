import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HistorialComponent } from '../modals/historial/historial.component';
import { ProjectdashboardService } from '../services/projectdashboard.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-projecthome',
  imports: [NgFor],
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

  unFormatName(name: string): Number {
    return Number.parseInt(name.split("-")[0])
  }
}

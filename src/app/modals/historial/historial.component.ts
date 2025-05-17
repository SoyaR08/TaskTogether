import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-historial',
  imports: [NgFor],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {

  projects: ProjectService = inject(ProjectService);

  ngOnInit(): void {
    this.projects.loadHistorical(9);
  }

  formatDate(dateString: string): string[] {
    const formatedDate = dateString.split('T');
    return formatedDate;
  }

}

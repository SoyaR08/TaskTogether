import { Component, Inject, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { NgFor, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-historial',
  imports: [NgFor, NgIf],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {

  projects: ProjectService = inject(ProjectService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { projectId: number }) {}

  ngOnInit(): void {
    this.projects.loadHistorical(11);
  }

  formatDate(dateString: string): string[] {
    const [date, hour] = dateString.split('T');
    const [year, month, day] = date.split('-')
    const formatedDate = `${day}-${month}-${year}`;
    return [formatedDate, hour];
  }

}

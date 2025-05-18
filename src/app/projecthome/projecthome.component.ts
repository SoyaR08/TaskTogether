import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HistorialComponent } from '../modals/historial/historial.component';


@Component({
  selector: 'app-projecthome',
  imports: [],
  templateUrl: './projecthome.component.html',
  styleUrl: './projecthome.component.css'
})
export class ProjecthomeComponent {

  @Input() projectName: string = '';
  dialog: MatDialog = inject(MatDialog)


  openHistorial() {
    this.dialog.open(HistorialComponent, {
      panelClass: 'custom-dialog-container'
    })
  }

  unFormatName(name: string): Number {
    return Number.parseInt(name.split("-")[0])
  }
}

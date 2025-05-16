import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HistorialComponent } from '../modals/historial/historial.component';


@Component({
  selector: 'app-projecthome',
  imports: [],
  templateUrl: './projecthome.component.html',
  styleUrl: './projecthome.component.css'
})
export class ProjecthomeComponent {

  dialog: MatDialog = inject(MatDialog)


  openHistorial() {
    this.dialog.open(HistorialComponent, {
      panelClass: 'custom-dialog-container'
    })
  }
}

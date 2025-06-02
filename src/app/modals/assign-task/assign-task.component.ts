import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assign-task',
  imports: [],
  templateUrl: './assign-task.component.html',
  styleUrl: './assign-task.component.css'
})
export class AssignTaskComponent {

  

  constructor(@Inject(MAT_DIALOG_DATA) public data: { projectId: Number }) {}

}

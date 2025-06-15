import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TaskComponent } from '../partials/task/task.component';
import { NgFor } from '@angular/common';
import { AssignTaskService } from '../services/assign-task.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-list-task',
  imports: [TaskComponent, NgFor, FormsModule],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit{
  service: AssignTaskService = inject(AssignTaskService);
  filter: string = '3';
  taskName: string = '';

  ngOnInit(): void {
    this.service.getUserTasks();
  }


  /**
   * El select me ponía el valor en string lo que me complicaba el filtrado
   * @param number El número en formato string
   * @returns el número en formato number
   */
  formatNumber(number: any): number {
    return Number.parseInt(number);
  }


}

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

  ngOnInit(): void {
    this.service.getUserTasks();
  }



  formatNumber(number: any) {
    return Number.parseInt(number);
  }

}

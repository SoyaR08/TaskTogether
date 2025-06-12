import { Component, inject, OnInit } from '@angular/core';
import { TaskComponent } from '../partials/task/task.component';
import { NgFor } from '@angular/common';
import { AssignTaskService } from '../services/assign-task.service';

@Component({
  selector: 'app-list-task',
  imports: [TaskComponent, NgFor],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit{
  service: AssignTaskService = inject(AssignTaskService);

  ngOnInit(): void {
      this.service.getUserTasks();
  }

}

import { Component, inject, Input } from '@angular/core';
import { Task } from '../../interfaces/task';
import { NgClass, NgIf } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { AssignTaskService } from '../../services/assign-task.service';


@Component({
  selector: 'app-task',
  imports: [NgClass, NgIf],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input() task!: Task;
  login: LoginService = inject(LoginService);
  assignement: AssignTaskService = inject(AssignTaskService);

  assignATask(userId: Number, taskId: Number) {
    this.assignement.assignTask(userId, taskId);
  }

  isMember(): boolean {
    //this.task.workers.forEach(worker => console.log(worker.id))
    return !!this.task.workers.find(worker => worker.id === this.login.user().id);
  }

}

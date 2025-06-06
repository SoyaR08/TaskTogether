import { Component, inject, Input } from '@angular/core';
import { Task } from '../../interfaces/task';
import { NgClass, NgIf } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { AssignTaskService } from '../../services/assign-task.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommentsComponent } from '../../modals/comments/comments.component';

@Component({
  selector: 'app-task',
  imports: [NgClass, NgIf, MatTooltipModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input() task!: Task;
  login: LoginService = inject(LoginService);
  assignement: AssignTaskService = inject(AssignTaskService);
  dialog: MatDialog = inject(MatDialog);

  commentTask() {
     this.dialog.open(CommentsComponent, {
          //panelClass: 'custom-dialog-container', Esto le pasa una clase css default
          height: '500px',
          width: '830px',
          data: {
            //projectId: this.unFormatName(this.projectName)
            taskId: this.task.id
          }
        })
  }

  assignATask(userId: Number, taskId: Number) {
    this.assignement.assignTask(userId, taskId);
  }

  isMember(): boolean {
    //this.task.workers.forEach(worker => console.log(worker.id))
    return !!this.task.workers.find(worker => worker.id === this.login.user().id);
  }

}

import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { notBeforeToday } from '../../validators/datevalidator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTask } from '../../interfaces/add-task';
import { LoginService } from '../../services/login.service';
import { TaskService } from '../../services/task.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-addtask',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css'
})
export class AddtaskComponent {

  private fb = inject(FormBuilder)
  private login: LoginService = inject(LoginService);
  private service: TaskService = inject(TaskService);
  newTaskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
    limitDate: ['', [Validators.required, notBeforeToday]],
    status: [0],
    priority: [0, [Validators.required]]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: { projectId: Number }) {}

  isInValid(field: string): boolean {
    return this.newTaskForm.controls[field].invalid && this.newTaskForm.controls[field].touched;
  }

  addTask() {
    if (this.newTaskForm.valid) {

      const task: AddTask = {
        ...this.newTaskForm.value,
        projectId: this.data.projectId,
        userCreator: this.login.user().id
      }
      alert(task.limitDate);
      this.service.addTask(task);
      this.newTaskForm.reset();

    } else {
      this.newTaskForm.markAllAsTouched();
    }
  }

}

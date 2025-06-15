import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { notBeforeToday } from '../../validators/datevalidator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTask } from '../../interfaces/add-task';
import { LoginService } from '../../services/login.service';
import { TaskService } from '../../services/task.service';
import { NgIf } from '@angular/common';
import { ProjectdashboardService } from '../../services/projectdashboard.service';
import Swal from 'sweetalert2';
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
  private projectDashboard: ProjectdashboardService = inject(ProjectdashboardService);
  newTaskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(140)]],
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
    limitDate: ['', [Validators.required, notBeforeToday]],
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
        status: 0,
        projectId: this.data.projectId,
        userCreator: this.login.user().id
      }
      this.service.addTask(task)
      .subscribe({
      next: response => {
        this.projectDashboard.setDashboard(response);
        Swal.fire({
        'title': 'Tarea añadida',
        'icon': 'success',
        'text': 'Tarea añadida con éxito'
      })
    },
      error: error => {
        console.error('Error al añadir la tarea:', error);
        alert('Error al añadir la tarea. Por favor, inténtelo de nuevo más tarde. '+error.message);
      }
    });
      this.service.taskAdded$.subscribe({
        next: response => this.projectDashboard.setDashboard(response),
        error: () => console.log("Error al añadir la tarea")
      })
      this.newTaskForm.reset();

    } else {
      this.newTaskForm.markAllAsTouched();
    }
  }

}

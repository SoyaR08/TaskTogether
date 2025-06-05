import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { MemberService } from '../../services/member.service';
import { NgFor } from '@angular/common';
import { AssignTaskService } from '../../services/assign-task.service';

@Component({
  selector: 'app-assign-task',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './assign-task.component.html',
  styleUrl: './assign-task.component.css'
})
export class AssignTaskComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  taskService: TaskService = inject(TaskService);
  memberService: MemberService = inject(MemberService);
  private assignService: AssignTaskService = inject(AssignTaskService);

  assignTaskForm: FormGroup = this.fb.group({
    task: ['', [Validators.required]],
    user: ['', [Validators.required]]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: { projectId: Number }) { }


  ngOnInit(): void {
    this.memberService.getMembersByProjectId(this.data.projectId);
    this.taskService.getActiveTasks(this.data.projectId);
  }

  isInValid(field: string): boolean {
    return this.assignTaskForm?.controls[field].invalid && this.assignTaskForm.controls[field].touched;
  }

  submit() {
    if (this.assignTaskForm.valid) {
      alert("Arriba España")
    } else {
      this.assignTaskForm.markAllAsTouched();
    }
  }

}

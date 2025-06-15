import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Commentadd } from '../../interfaces/comments/commentadd';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-comments',
  imports: [NgFor, NgClass, ReactiveFormsModule, NgIf],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{

  
  service: CommentService = inject(CommentService);
  private fb: FormBuilder = inject(FormBuilder);
  private login: LoginService = inject(LoginService);
  commentData!: {userId: Number, taskId: Number, date: string};
  commentForm: FormGroup = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(15)]]
  })
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { taskId: Number, userId: Number }) {
  }
  ngOnInit(): void {
    this.service.getComments(this.data.taskId);
    this.commentData = {
      taskId: this.data.taskId,
      userId: this.login.user().id,
      date: new Date().toISOString().split('T')[0]
    }
  }

  isInvalidField(field: string): boolean {
    return this.commentForm.controls[field].invalid && this.commentForm.controls[field].touched;
  }

  submit() {
    if (this.commentForm.valid) {
      

      
      const comment: Commentadd = {
        ...this.commentData,
        content: this.commentForm.value.content
      }

      this.service.addComment(comment);

    } else {
      this.commentForm.markAllAsTouched();
    }
  }

}

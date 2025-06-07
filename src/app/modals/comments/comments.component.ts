import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [NgFor, NgClass],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{

  service: CommentService = inject(CommentService);
  private fb: FormBuilder = inject(FormBuilder);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { taskId: Number }) {}

  ngOnInit(): void {
    this.service.getComments(this.data.taskId);
  }

}

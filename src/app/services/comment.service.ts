import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Commentlist } from '../interfaces/comments/commentlist';
import { Commentadd } from '../interfaces/comments/commentadd';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl: string = "https://tasktogether-api.onrender.com/comments";
  private http: HttpClient = inject(HttpClient);
  private commentSignal = signal<Commentlist[]>([]);

  get comments(): Signal<Commentlist[]> {
    return this.commentSignal.asReadonly()
  }

  getComments(taskId: Number): void {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.get<Commentlist[]>(`${this.baseUrl}?taskId=${taskId}`, { headers })
      .subscribe({
        next: response => this.commentSignal.set(response),
        error: err => {
          if (err.error) {
            alert(err.error)
          } else {
            alert(err.message)
          }
        }
      })

  }

  addComment(comment: Commentadd) {
    alert(comment.userId);
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.post<Commentlist>(`${this.baseUrl}`, comment, { headers })
      .subscribe({
        next: response => {
          this.commentSignal.update(comment => [...comment, response]);
          Swal.fire({
            title: 'Éxito',
            icon: 'success',
            text: 'Comentario añadido'
          })
        }, error: err => {
          Swal.fire({
            title: '¡Error!',
            icon: 'error',
            text: err?.message || err.error
          })
        }
      })

  }

}

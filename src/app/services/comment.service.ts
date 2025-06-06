import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Commentlist } from '../interfaces/comments/commentlist';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl: string = "http://localhost:8080/comments";
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

    this.http.get<Commentlist[]>(`${this.baseUrl}?taskId=${taskId}`, {headers})
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

}

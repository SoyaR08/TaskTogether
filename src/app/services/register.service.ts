import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register } from '../interfaces/register';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http: HttpClient = inject(HttpClient);

  registerUser (register: Register): Observable<any> {
    return this.http.post("https://tasktogether-api.onrender.com/register", register)

  }

  checkEmailIfExists(email: string) {
    return this.http.get<any>(`https://tasktogether-api.onrender.com/nonauth/users/${email}`)
    .pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }

}

import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-list-projects',
  imports: [],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.css'
})
export class ListProjectsComponent {

  login: LoginService = inject(LoginService)

}

import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  loginService: LoginService = inject(LoginService);

}

import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { EditProfileComponent } from '../partials/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  imports: [EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  loginService: LoginService = inject(LoginService);
  
  

}

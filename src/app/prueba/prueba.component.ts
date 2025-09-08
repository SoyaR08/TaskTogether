import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NavbarComponent } from '../partials/navbar/navbar.component';

@Component({
  selector: 'app-prueba',
  imports: [NavbarComponent],
  templateUrl: './prueba.component.html'
})
export class PruebaComponent {

  
}

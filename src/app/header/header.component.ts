import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentRoute: string = '';
  loginService: LoginService = inject(LoginService);

  constructor(private router: Router) {
    // Obtener la ruta actual
    this.currentRoute = this.router.url;

    // Suscribirse a los cambios de la ruta
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  isOnRoute(route: string): boolean {
    return this.currentRoute === route;
  }

}

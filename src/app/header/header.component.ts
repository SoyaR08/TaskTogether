import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentRoute: string = '';

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

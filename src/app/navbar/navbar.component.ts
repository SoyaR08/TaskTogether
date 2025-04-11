import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

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

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouteService } from './services/route.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HeaderComponent ,NgClass, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TaskTogether';

  currentRoute: string = '';
  routerService: RouteService = inject(RouteService);

  constructor(private router: Router) {
    // Obtener la ruta actual
    this.currentRoute = this.router.url;

    // Suscribirse a los cambios de la ruta
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  isOnIndex(): boolean {
    return this.isOnRoute('/');
  }

  isOnRoute(route: string): boolean {
    return this.currentRoute === route;
  }

}

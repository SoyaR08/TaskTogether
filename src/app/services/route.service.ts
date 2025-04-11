import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private currentRoute: string = '';
  constructor(private router: Router) {
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

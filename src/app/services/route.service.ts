import { Injectable, OnChanges, signal, Signal, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private currentRoute = signal<string>('');
  constructor(private router: Router) {
    this.currentRoute.set(this.router.url);

    // Suscribirse a los cambios de la ruta
    this.router.events.subscribe(() => {
      this.currentRoute.set(this.router.url);
    });
  }



  get actualRoute(): Signal<string> {
    return this.currentRoute.asReadonly();
  }

  isOnRoute(route: string): boolean {
    return this.currentRoute() === route;
  }

  redirectTo(route: any): void {
    this.router.navigate(route)
  }

  /**
   * Método para simplificar las comprobaciones de ruta
   * @returns true: Si se encuentra en las rutas que contienen solo un formulario; login y register
   */
  isJustAForm(): boolean {
    return this.isOnRoute('/register') || this.isOnRoute('/login')
  }
}

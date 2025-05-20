import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '../../interfaces/breadcrumb';

@Component({
  selector: 'app-breadcrum',
  imports: [RouterLink],
  templateUrl: './breadcrum.component.html',
  styleUrl: './breadcrum.component.css'
})
export class BreadcrumComponent {


  routeService: RouteService = inject(RouteService);

  pathFormater(path: string) {
    const noSlashedPath = path.substring(1).split('/'); //Desarmo la ruta dividiendo por /
    
    const map: Record<string, string> = {
      "projects": "Mis Proyectos",
      "tasks": "Tareas Pendientes",
      "profile": "Perfil",
      "adminSection": "Vista de Administrador",
      "list": "Listado de Usuarios",
      "newproject": "Crear nuevo proyecto"
    };

    const formatedPath: Breadcrumb[] = noSlashedPath.map(
      part => {
        if (map[part]) {
          return {route: part, breadcrumb: map[part]}
        } else {
          return {route: part, breadcrumb: part}
        }
      }
    )

    return formatedPath;
  }

}

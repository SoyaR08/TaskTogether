import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-breadcrum',
  imports: [],
  templateUrl: './breadcrum.component.html',
  styleUrl: './breadcrum.component.css'
})
export class BreadcrumComponent {


  routeService: RouteService = inject(RouteService);

  pathFormater(path: string) {
    const noSlashedPath = path.substring(1).split('/'); //Desarmo la ruta dividiendo por /
    
    const map: Record<string, string> = {
      "dashboard": "Inicio",
      "projects": "Mis Proyectos",
      "tasks": "Tareas Pendientes"
    };

    const formatedPath: string[] = noSlashedPath.map(
      part => map[part]
    )

    return formatedPath;
  }

}

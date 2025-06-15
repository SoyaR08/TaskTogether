import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Breadcrumb } from '../../interfaces/breadcrumb';

@Component({
  selector: 'app-breadcrum',
  imports: [RouterLink],
  templateUrl: './breadcrum.component.html',
  styleUrl: './breadcrum.component.css'
})
export class BreadcrumComponent {


  routeService: RouteService = inject(RouteService);
  router: ActivatedRoute = inject(ActivatedRoute);

  getRouterLink(index: number, breadcrumbs: Breadcrumb[]): string {
    const path = breadcrumbs.slice(0, index + 1).map(b => b.route).join('/');
    return `/${path}`;
  }

  getQueryParams(index: number, breadcrumbs: Breadcrumb[]): any {
    const isLast = index === breadcrumbs.length - 1;
    if (isLast) {
      const projectId = this.router.snapshot.queryParamMap.get('projectId');
      return projectId ? { projectId } : null;
    }
    return null;
  }



  pathFormater(path: string): Breadcrumb[] {
    // 1. Eliminar los queryParams
    const pathWithoutQuery = path.split('?')[0];

    // 2. Dividir la ruta en segmentos
    const segments = pathWithoutQuery.substring(1).split('/'); // Elimina la barra inicial y separa

    // 3. Diccionario de rutas legibles
    const map: Record<string, string> = {
      "projects": "Mis Proyectos",
      "projectView": "Vista del Proyecto",
      "tasks": "Tareas Pendientes",
      "profile": "Perfil",
      "adminSection": "Vista de Administrador",
      "list": "Listado de Usuarios",
      "newproject": "Crear nuevo proyecto",
      "addColaborators": "Añadir Colaborador"
    };

    // 4. Generar los breadcrumbs
    return segments.map(segment => ({
      route: segment,
      breadcrumb: map[segment] || segment
    }));
  }


}

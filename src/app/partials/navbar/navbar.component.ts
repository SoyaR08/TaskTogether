import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentRoute: string = '';
  routerService: RouteService = inject(RouteService);

}

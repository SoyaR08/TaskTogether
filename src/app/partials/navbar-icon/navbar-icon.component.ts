import { Component, inject, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { NavbarIcon } from '../../interfaces/general/navbaricon';
@Component({
  selector: 'app-navbar-icon',
  imports: [RouterLink, NgClass, NgIf],
  templateUrl: './navbar-icon.component.html',
  styleUrl: './navbar-icon.component.css'
})
export class NavbarIconComponent {

  @Input() icon!: NavbarIcon;

  currentRoute: string = '';
  routerService: RouteService = inject(RouteService);

}

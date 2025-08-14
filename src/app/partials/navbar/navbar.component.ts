import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { navbarIcons } from '../../interfaces/general/navbaricon';
import { NavbarIconComponent } from '../navbar-icon/navbar-icon.component';
@Component({
  selector: 'app-navbar',
  imports: [NgFor, NavbarIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentRoute: string = '';
  routerService: RouteService = inject(RouteService);
  icons = navbarIcons;

}

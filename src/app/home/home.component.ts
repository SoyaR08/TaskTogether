import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../partials/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



}

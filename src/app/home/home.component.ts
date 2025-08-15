import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  dashboard: DashboardService = inject(DashboardService)

  ngOnInit(): void {
    this.dashboard.getUserStats();
    console.log(this.dashboard.stats().activeProjectsNumber)
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  dashboard: DashboardService = inject(DashboardService);

  ngOnInit(): void {
      this.dashboard.getUserStats();
      console.log(this.dashboard.stats().activeProjectsNumber)
  }

}

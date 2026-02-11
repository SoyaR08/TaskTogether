import { Component, inject, OnInit  } from '@angular/core';
import { NgFor } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { DashboardcardComponent } from '@/ui/dashboardcard/dashboardcard.component';


@Component({
  selector: 'app-dashboard',
  imports: [NgFor, DashboardcardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  dashboard: DashboardService = inject(DashboardService)

  ngOnInit(): void {
    this.dashboard.getUserStats();
    console.log(this.dashboard.stats().activeProjectsNumber)
  }

}

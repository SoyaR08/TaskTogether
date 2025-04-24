import { Component, inject, OnInit } from '@angular/core';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  routerservice: RouteService = inject(RouteService);

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.routerservice.redirectTo(['/dashboard']);
      
    }
  }

}

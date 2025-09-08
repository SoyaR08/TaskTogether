import { Component, inject, OnInit } from '@angular/core';
import { RouteService } from '../services/route.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-index',
  imports: [FooterComponent],
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

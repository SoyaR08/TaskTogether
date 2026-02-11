import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboardcard',
  imports: [NgFor],
  template: `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front active-projects-border">
                    <p class="title active-projects">{{title}}</p>
                    <p class="giant">{{number}}</p>
                </div>
                <div class="flip-card-back active-projects-back active-projects-border">
                    <p class="title">Resumen</p>
                    <ul class="list">
                        <li *ngFor="let prj of list">
                            {{prj.name}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
  `,
  styleUrl: './dashboardcard.component.css'
})
export class DashboardcardComponent {

  @Input() title !: string;
  @Input() number !: number;
  @Input() list !: Array<any>;

}

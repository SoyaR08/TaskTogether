import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HistorialComponent } from '../modals/historial/historial.component';
import { ProjectdashboardService } from '../services/projectdashboard.service';
import { NgFor, NgIf } from '@angular/common';
import { AddtaskComponent } from '../modals/addtask/addtask.component';
import { TaskComponent } from '../partials/task/task.component';
import { AssignTaskComponent } from '../modals/assign-task/assign-task.component';
import { LoginService } from '../services/login.service';
import { ListMembersComponent } from '../modals/list-members/list-members.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkDragDrop, DragDropModule, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

/**
 *  
 */

@Component({
  selector: 'app-projecthome',
  imports: [NgFor, TaskComponent, NgIf, MatTooltipModule, DragDropModule],
  templateUrl: './projecthome.component.html',
  styleUrl: './projecthome.component.css'
})
export class ProjecthomeComponent implements OnInit {

  @Input() projectId!: number;
  dialog: MatDialog = inject(MatDialog)
  dashboardService: ProjectdashboardService = inject(ProjectdashboardService);
  login: LoginService = inject(LoginService);

  ngOnInit(): void {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      //this.dashboardService.getDashboard(this.unFormatName(this.projectName), token);
      this.dashboardService.getDashboard(this.projectId, token);
    } else {
      alert('No se ha encontrado el token de autenticación');
    }
  }


  openHistorial() {
    this.dialog.open(HistorialComponent, {
      //panelClass: 'custom-dialog-container', Esto le pasa una clase css default
      height: '500px',
      width: '830px',
      data: {
        //projectId: this.unFormatName(this.projectName)
        projectId: this.projectId
      }
    })
  }

  openMembers() {
    this.dialog.open(ListMembersComponent, {
      //panelClass: 'custom-dialog-container', Esto le pasa una clase css default
      height: '500px',
      width: '830px',
      data: {
        //projectId: this.unFormatName(this.projectName)
        projectId: this.projectId
      }
    })
  }

  createTask() {
    this.dialog.open(AddtaskComponent, {
      height: '650px',
      width: '830px',
      data: {
        //projectId: this.unFormatName(this.projectName)
        projectId: this.projectId
      }
    })
  }

  assignTask() {
    this.dialog.open(AssignTaskComponent, {
      height: '450px',
      width: '630px',
      data: {
        //projectId: this.unFormatName(this.projectName)
        projectId: this.projectId
      }
    })
  }

  unFormatName(name: string): Number {
    return Number.parseInt(name.split("-")[0])
  }

  isProjectAdmin(): boolean {
    let isAdmin = false;
    this.dashboardService.dashboard().members.forEach(admin => {
      if (admin.id === this.login.user().id && admin.projectRole === 'PROJECT_ADMIN') {
        isAdmin = true;
      }
    });
    return isAdmin;
  }

  drop(event: CdkDragDrop<any[]>, targetList: 'pending' | 'progress' | 'finished') {
    const dashboard = this.dashboardService.dashboard();

    const sourceList = event.previousContainer.data;
    const targetListRef = dashboard[targetList];
    console.log(event.item.data);
    if (event.previousContainer === event.container) {
      moveItemInArray(targetListRef, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        sourceList,
        targetListRef,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

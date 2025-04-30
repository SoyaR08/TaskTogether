import { Component, inject, OnChanges, OnInit, signal } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';



@Component({
  selector: 'app-user-list',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  filter: string = '';
  order: string = '';
  admin: AdminService = inject(AdminService);


  ngOnInit(): void {
    this.admin.getAllUsers();

  }

  formatNulls(data: string): string {
    return data ? data : 'No se ha proporcionado';
  }

  formatRole(data: string): string {
    const map: Record<string, string> = {
      'GEN_ADMIN': 'Administrador',
      'USER': 'Usuario'
    }

    return map[data];
  }

}

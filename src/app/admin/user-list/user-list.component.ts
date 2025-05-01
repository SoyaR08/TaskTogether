import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user-list',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

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

  changeRole(role: any, id: number) {
    const object = {
      id: id,
      newRole: role
    }

    this.admin.changeRole(object)
      .subscribe({
        next: () => {
          Swal.fire({
            title: '¡Exito!',
            text: 'Rol editado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        },
        error: () => {
          Swal.fire({
            title: '¡Error!',
            text: 'Error al editar',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      })
  }

}

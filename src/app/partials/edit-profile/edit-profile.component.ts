import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-profile',
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {


  submit() {
    Swal.fire({
      title: '¡Exito!',
      text: 'Los cambios se han guardado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'

    })
  }
}

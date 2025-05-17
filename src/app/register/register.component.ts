import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Register } from '../interfaces/register';
import { RouterLink } from '@angular/router';
import { emailExistsValidator } from '../validators/emailvalidator';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //Campos a introducir en el formulario
  /**
   * Nombre: Obligatorio
   * Correo: Obligatorio
   * Contraseña: Obligatorio, ocho caractéres, una mayúscula, una minúscula, un número y un caracter especial
   * Confirmar contraseña: Obligatorio, igual que el campo anterior
   * Dirección: Opcional
   * Descripción del trabajo que realiza: Opcional
  */

  private fb: FormBuilder = inject(FormBuilder);
  private service: RegisterService = inject(RegisterService);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email], [emailExistsValidator(this.service)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&+-._¿])[A-Za-z\d@$!%*?&+-._¿]{8,}$/)]],
    confirmPassword: ['', [Validators.required, 
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&+-._¿])[A-Za-z\d@$!%*?&+-._¿]{8,}$/)]],
    address: [''],
    job: ['']
  })


  isValid(field: string): boolean {
    return this.registerForm?.controls[field].invalid && this.registerForm?.controls[field].touched;
  }
  
  validPasswords() {
    return this.registerForm.controls['password'].value === this.registerForm.controls['confirmPassword'].value;
  }

  submit() {
    if (this.registerForm.valid && this.validPasswords()) {

      const newuser = {
        name: this.registerForm.controls['name'].value,
        email: this.registerForm.controls['email'].value,
        password: this.registerForm.controls['password'].value,
        address: this.registerForm.controls['address'].value,
        job: this.registerForm.controls['job'].value
      }
      
      console.log(newuser);

      this.service.registerUser(newuser)
      .subscribe({
        next: () => {
          alert("Registrado correctamente");
          this.registerForm.reset();
        },
        error: (err) => alert(err.message)
      });

      
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}

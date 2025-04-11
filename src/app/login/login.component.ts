import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private service: LoginService = inject(LoginService);

  login: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  isInvalidField(field: string): boolean {
    return this.login.controls[field].invalid && this.login.controls[field].touched;
  }

  submitForm() {
    if (this.login.valid) {
      this.service.signin(this.login.value);
    } else {
      this.login.markAllAsTouched();
    }
  }
}

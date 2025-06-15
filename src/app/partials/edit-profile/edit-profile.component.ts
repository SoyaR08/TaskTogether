import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  private login: LoginService = inject(LoginService)
  private fb: FormBuilder = inject(FormBuilder);
  profileForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    password: [''],
    confirmPassword: [''],
    address: [''],
    job: ['']
  })

  isValid(field: string): boolean {
    return this.profileForm?.controls[field].invalid && this.profileForm?.controls[field].touched;
  }

  submit() {

    if (this.profileForm.valid) {

      const formData = new FormData();

      const profile = {
        name: this.profileForm.controls['name'].value,
        password: this.profileForm.controls['password'].value,
        address: this.profileForm.controls['address'].value,
        job: this.profileForm.controls['job'].value
      }

      formData.append('stringPUT', JSON.stringify(profile))

      const fileInput = document.querySelector<HTMLInputElement>('#pfp');
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append('profile_pic', fileInput.files[0]);
      }

      this.login.editProfile(formData);

    } else {
      this.profileForm.markAllAsTouched();
    }

  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css'
})
export class NewProjectComponent {

  private fb: FormBuilder = inject(FormBuilder);

  project: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    start_date: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
    end_date: ['', [Validators.required]]
  })

  submit() {
    
  }
}

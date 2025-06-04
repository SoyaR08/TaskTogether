import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-addmember',
  imports: [ReactiveFormsModule],
  templateUrl: './addmember.component.html',
  styleUrl: './addmember.component.css'
})
export class AddmemberComponent {

  private fb: FormBuilder = inject(FormBuilder)
  newmemberForm = this.fb.group({
    project: ['', [Validators.required]],
    members: this.fb.array([])
  })

  newMember: FormControl = this.fb.control('', [Validators.required]); // Control para añadir el nuevo miembro

}

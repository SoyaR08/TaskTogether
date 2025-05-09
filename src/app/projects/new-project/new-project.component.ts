import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ProjectService } from '../../services/project.service';
import { AddProject } from '../../interfaces/add-project';
import { NgIf } from '@angular/common';





@Component({
  selector: 'app-new-project',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css'
})
export class NewProjectComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private login: LoginService = inject(LoginService);
  private projectService: ProjectService = inject(ProjectService);

  project: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    start_date: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
    end_date: ['', [Validators.required]],
    status: ['IN_PROGRESS']
  }, {validators: this.fechaInicioMenorQueFin()})

  isInvalidField(field: string) {
    return this.project.controls[field].invalid && this.project.controls[field].touched
  }

  fechaInicioMenorQueFin(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get('start_date')?.value;
      const end = group.get('end_date')?.value;
  
      if (start && end && new Date(start) > new Date(end)) {
        return { fechaInvalida: 'La fecha de inicio debe ser anterior a la de fin' };
      }
      return null;
    };
  }

  submit() {
    if (this.project.valid) {

      const newProject: AddProject = {
        ...this.project.value,
        userCreator: this.login.user().id
      };

      this.projectService.addProject(newProject)
      this.project.reset();
    } else {
      this.project.markAllAsTouched();
    }
  }
}

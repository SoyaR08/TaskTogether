import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ProjectService } from '../../services/project.service';
import { AddProject } from '../../interfaces/add-project';
import { NgIf } from '@angular/common';
import { notBeforeToday } from '../../validators/datevalidator';
import { SearchUserComponent } from '../../partials/search-user/search-user.component';
import { UserMinimumDetails } from '../../interfaces/user-minimum-details';





@Component({
  selector: 'app-new-project',
  imports: [FormsModule, ReactiveFormsModule, NgIf, SearchUserComponent],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css'
})
export class NewProjectComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private login: LoginService = inject(LoginService);
  private projectService: ProjectService = inject(ProjectService);

  project: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    start_date: ['', [Validators.required, notBeforeToday]],
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
    end_date: ['', [Validators.required]],
    status: ['IN_PROGRESS'],
    members: this.fb.array([]) //array de miembros del proyecto
  }, { validators: this.fechaInicioMenorQueFin() })

  //newMember: FormControl = this.fb.control('', [Validators.required]); // Control para añadir el nuevo miembro

  /**
   * Devuelve el array de miembros de proyecto para que el usuario los pueda ver
   */
  get members(): FormArray {
    return this.project.get('members') as FormArray;
  }

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

  // /**
  //  * Añade un nuevo miembro al proyecto
  //  */
  // addMember() {
  //   if (this.newMember.valid) {
  //     this.members.push(
  //       this.fb.control(this.newMember.value, [Validators.required])
  //     )
  //     this.newMember.reset();
  //   }
  // }

  /**
   * Tengo que pasarle un miembro y añadir un formgroup que tenga los controles como atributos el objeto
   * @param member 
   */
  addMember2(member: UserMinimumDetails) {
    this.members.push(
      this.fb.group({
        id: [member.id, [Validators.required]],
        name: [member.name, [Validators.required]],
        email: [member.email, [Validators.required, Validators.email]],
        address: [member.address, [Validators.required]],
        job: [member.job, [Validators.required]],
        role: [member.role, [Validators.required]]
      })
    )


  }

  deleteMember(index: number) {
    this.members.removeAt(index);
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

import { Component, effect, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../services/member.service';
import { LoginService } from '../services/login.service';
import { NgFor } from '@angular/common';
import { SearchUserComponent } from '../partials/search-user/search-user.component';
import { UserMinimumDetails } from '../interfaces/user-minimum-details';

@Component({
  selector: 'app-addmember',
  imports: [ReactiveFormsModule, NgFor, SearchUserComponent],
  templateUrl: './addmember.component.html',
  styleUrl: './addmember.component.css'
})
export class AddmemberComponent {

  private fb: FormBuilder = inject(FormBuilder);
  login: LoginService = inject(LoginService);
  service: MemberService = inject(MemberService);
  newmemberForm = this.fb.group({
    project: [0, [Validators.required]],
    members: this.fb.array([])
  })

  newMember: FormControl = this.fb.control('', [Validators.required]); // Control para añadir el nuevo miembro

  get members() {
    return this.newmemberForm.get('members') as FormArray;
  }

  constructor() {
    effect(() => {
      const user = this.login.userDetails(); // accedes directamente a la signal reactiva
      if (user?.id) {
        this.service.getProjectsByMemberId(user.id);
      }
    });
  }

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
}
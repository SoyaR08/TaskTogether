import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from '../../services/member.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list-members',
  imports: [NgFor, NgIf],
  templateUrl: './list-members.component.html',
  styleUrl: './list-members.component.css'
})
export class ListMembersComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: { projectId: number }, public service: MemberService) {}
  
  ngOnInit(): void {
    this.service.getMembersByProjectId(this.data.projectId);
  }

  formatRole(role: string): string {
    const map: Record<string, string> = {
      "PROJECT_ADMIN": "Administrador",
      "PROJECT_MEMBER": "Colaborador"
    }

    return map[role] || role;
  }

}

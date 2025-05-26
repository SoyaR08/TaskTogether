import { Component, inject, EventEmitter, Output } from '@angular/core';
import { SearchUserService } from '../../services/search-user.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { UserMinimumDetails } from '../../interfaces/user-minimum-details';

@Component({
  selector: 'app-search-user',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {

  @Output() userSelected: EventEmitter<UserMinimumDetails> = new EventEmitter<UserMinimumDetails>()
 service: SearchUserService = inject(SearchUserService);
 email: string = '';

  sendUser(user: UserMinimumDetails) {
    this.userSelected.emit(user);
    this.service.clearSignal();
    this.email = '';
  }

}

import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: "full" },
  { path: 'list', component: UserListComponent } //Una de las rutas hijas lazy
];
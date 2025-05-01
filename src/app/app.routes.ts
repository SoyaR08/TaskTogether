import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './admin/user-list/user-list.component';

export const routes: Routes = [
    
    {path: '', component: IndexComponent},
    //{path: '', redirectTo: 'register', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'prueba', component: NavbarComponent},
    {path: 'adminSection', loadChildren: () => import('./admin/adminroutes').then(m => m.routes)}, 
    //con esto cargan las rutas perezosas de quedando así => /adminSection/ruta
    {path: '**', component: NavbarComponent}
];

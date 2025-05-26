import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { ListProjectsComponent } from './projects/list-projects/list-projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjecthomeComponent } from './projecthome/projecthome.component';
import { SearchUserComponent } from './partials/search-user/search-user.component';


export const routes: Routes = [
    
    {path: '', component: IndexComponent},
    //{path: '', redirectTo: 'register', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'projects', children: [
        {path: '', component: ListProjectsComponent},
        {path: 'newproject', component: NewProjectComponent, pathMatch: 'full'},
        {path: ':projectName', component: ProjecthomeComponent}
    ]},
    {path: 'prueba', component: SearchUserComponent},
    {path: 'adminSection', loadChildren: () => import('./admin/adminroutes').then(m => m.routes)}, 
    //con esto cargan las rutas perezosas de quedando así => /adminSection/ruta
    {path: '**', component: LoginComponent}
];

import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { Routes } from '@angular/router';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserRegistrationComponent } from './components/userRegistration/userRegistration.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { TaskComponent } from './components/task/task.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: FrontpageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: UserRegistrationComponent},
  { path: 'user-profil', component: UserProfilComponent, canActivate: [authGuard]},
  { path: 'project-dashboard', component: ProjectDashboardComponent},
  { path: 'admin-page', component: AdminPageComponent},
  { path: 'project-create', component: ProjectCreateComponent},
  { path: 'project-details/:id', component: ProjectDetailsComponent},
  { path: 'task', component: TaskComponent},


];

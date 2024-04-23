import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { Routes } from '@angular/router';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserRegistrationComponent } from './components/userRegistration/userRegistration.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

export const routes: Routes = [
  { path: '', component: FrontpageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user-registrering', component: UserRegistrationComponent},
  { path: 'user-profil', component: UserProfilComponent},
  { path: 'project-dashboard', component: ProjectDashboardComponent},
  { path: 'admin-page', component: AdminPageComponent}
];

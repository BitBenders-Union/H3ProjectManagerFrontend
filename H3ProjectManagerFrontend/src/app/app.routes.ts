import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { Routes } from '@angular/router';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserRegistrationComponent } from './components/userRegistration/userRegistration.component';

export const routes: Routes = [
  { path: '', component: FrontpageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'project-dashboard', component: ProjectDashboardComponent}

];

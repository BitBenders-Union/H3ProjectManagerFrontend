import { Component } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    ProjectComponent,
    CommonModule,

  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {


  ownProjects: any[] = [];

  othersProjects: any[] = [];

  ngOnInit(){

    this.ownProjects = this.getProjects();
    this.othersProjects = this.getProjects();
  }

  // get a list of projects, change to api call
  getProjects(){

    return [0, 0, 0];
  }

}

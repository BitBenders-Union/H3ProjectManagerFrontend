import { ApiServiceService } from './../../service/api-service.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectDashboard } from '../../models/Project';
import { Router, RouterLink } from '@angular/router';
import { ApiGenericMethodsService } from '../../service/api-generic-methods.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent implements OnInit {
  
  projectList : ProjectDashboard[] = []

  // make a service that gets all the projects for the user
  constructor(private apiService: ApiGenericMethodsService, private route: Router, private token: TokenService) {}

  ngOnInit(){
    // call the service to get all the projects

    this.apiService.getAll<ProjectDashboard>("Project/GetForUser", this.token.getIdFromToken()).subscribe({
      next: (data: ProjectDashboard[]) => {
        console.log(data);
        this.projectList = data;
      },
      error: (error) => {
        console.error('There was an error in project-dashboard!', error.message);
      }
    })


  }

  navigateToProjectDetails(index: number){
    this.route.navigate(['/project-details', this.projectList[index].id]);
  }



}

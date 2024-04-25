import { ApiServiceService } from './../../service/api-service.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectDashboard } from '../../models/Project';
import { RouterLink } from '@angular/router';
import { ApiGenericMethodsService } from '../../service/api-generic-methods.service';

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
  constructor(private apiService: ApiGenericMethodsService) {}

  ngOnInit(){
    // call the service to get all the projects

    this.apiService.getAll<ProjectDashboard>("Project/getAll", 1).subscribe({
      next: (data) => {
        console.log(data);
        this.projectList = data;
      },
      error: (error) => {
        console.error('There was an error in project-dashboard!', error.message);
      },
      complete: () => {
        console.log("Complete");
      }
    })


  }

  navigateToProjectDetails(index: number){
    console.log(index);
  }

  createNewProject(){
    
  }

}

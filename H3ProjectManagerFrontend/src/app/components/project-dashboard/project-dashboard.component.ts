import { ApiServiceService } from './../../service/api-service.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectDashboard } from '../../models/Project';

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent implements OnInit {
  
  projectList : ProjectDashboard[] = []

  // make a service that gets all the projects for the user
  constructor(private apiService: ApiServiceService<ProjectDashboard>) {}

  ngOnInit(){
    // call the service to get all the projects

    this.apiService.getAll("Project/getAll", 1).subscribe({
      next: (data) => {
        console.log(data);
        this.projectList = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
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

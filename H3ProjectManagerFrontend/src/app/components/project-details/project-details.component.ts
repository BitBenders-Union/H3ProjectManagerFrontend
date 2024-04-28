import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiGenericMethodsService } from '../../service/api-generic-methods.service';
import { ProjectDetails } from '../../models/Project';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit{

  project!: ProjectDetails;
  owner!: User;

  constructor(
    private routeActive: ActivatedRoute,
    private route: Router,
    private apiService: ApiGenericMethodsService
  ) { }

  ngOnInit(){
    // get the id from the url
    let id = this.routeActive.snapshot.paramMap.get('id');

    this.getProjectDetails(Number(id));
  }

  getProjectDetails(id: number){
    this.apiService.getOne<ProjectDetails>('Project', id).subscribe({
      next: (data) => {
        this.project = data;
        this.getprojectOwner();

      },
      error: (error: Error) => {
        console.log(error.message);
        // this.route.navigate(['/project-dashboard']);
      }
    })

  }

  getprojectOwner(){
    this.apiService.getOne<User>('User', this.project.ownerId).subscribe({
      next: (data) => {
        this.owner = data;
      },
      error: (error: Error) => {
        console.log(error.message);
      }
    })
  }



}

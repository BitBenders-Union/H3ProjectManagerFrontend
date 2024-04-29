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
        this.project = {
          id: 0,
          name: 'Project - Title',
          ownerId: 0,
          startDate: new Date(),
          endDate: new Date(),
          status: {
            id: 0,
            name: 'Status - Name',
          
          },
          tasks: [
            {
              id: 0,
              name: 'Project not found',
              description: 'Project not found',
              projectId: 0,
              priority: {
                id: 0,
                name: 'Project not found',
              },
              status: {
                id: 0,
                name: 'Project not found',
              },
              projectTaskCategory: {
                id: 0,
                name: 'Project not found',
              },
              userDetail: [],
              comments: []
            },
            {
              id: 1,
              name: 'Project not found',
              description: 'Project not found',
              projectId: 0,
              priority: {
                id: 0,
                name: 'Project not found',
              },
              status: {
                id: 0,
                name: 'Project not found',
              },
              projectTaskCategory: {
                id: 0,
                name: 'Project not found',
              },
              userDetail: [],
              comments: []
            }
          ],
          category: {
            id: 0,
            name: 'Category - Name',
          },
          priority: {
            id: 0,
            name: 'Priority - Name',
          },
          client: {
            id: 0,
            name: 'Client - Name',
          },
          department: [
            {
              id: 0,
              name: 'Department - Name',
            }
          ],
          user: [
            {
              id: 0,
              username: 'User 1',
              firstName: 'First',
              lastName: 'Last',
            },
            {
              id: 1,
              username: 'bob',
              firstName: 'bob',
              lastName: 'bob',
            }
          ]
        }
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

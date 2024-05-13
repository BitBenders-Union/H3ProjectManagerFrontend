import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiGenericMethodsService } from '../../service/api-generic-methods.service';
import { ProjectDetails } from '../../models/Project';
import { CommonModule, NgFor } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { LocalProject } from '../../models/LocalJson';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    NgFor
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit{

  // !Important
  // hardcoded data, remove after stylinig

  project: ProjectDetails = {
    id: 0,
    name: 'Project - Title',
    owner: 'none',
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
        name: 'Project 1 not found',
        description: 'Project 1  description not found',
        projectId: 0,
        priority: {
          id: 0,
          name: 'Haster',
        },
        status: {
          id: 0,
          name: 'Opstart',
        },
        projectTaskCategory: {
          id: 0,
          name: 'Feat add',
        },
        userDetail: [
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
          },
          {
            id: 2,
            username: 'john',
            firstName: 'john',
            lastName: 'john',
          }          
        ],
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
        username: 'User 2',
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

  owner: User = {
    id: 0,
    username: 'User 1',
    firstName: 'First',
    lastName: 'Last',
  }

  constructor(
    private routeActive: ActivatedRoute,
    private route: Router,
    private apiService: ApiGenericMethodsService,
    private http: HttpClient
  ) { }

  loc?: ProjectDetails
  id: number = 0;

  ngOnInit(){

    this.routeActive.paramMap.subscribe({
      next: (data) => {
        this.id = Number(data.get('id'));
        console.log(this.id);
        this.getProjectDetails(this.id);
      }

    })
    // get the id from the url
    // this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    // this.tempJsonProjectDetail();
  }

  // tempJsonProjectDetail(){
  //   this.http.get<LocalProject>("./assets/json/temp-project-detail.json").subscribe({
  //     next:(data) => {
  //       this.loc = data;
  //       console.log(this.loc.status?.name);
  //     }
  //   })
  // }

  getProjectDetails(id: number){
    this.apiService.getOne<ProjectDetails>('Project', id).subscribe({
      next: (data) => {
        this.loc = data;
        console.log(this.project)
        // this.getprojectOwner();

      },
      error: (error: Error) => {
        console.log(error.message);
        
      }
    })

  }

  //We don't store owner name as string in DB no point of getting it from API
  // getprojectOwner(){
  //   this.apiService.getOne<User>('User', this.project.ownerId).subscribe({
  //     next: (data) => {
  //       this.owner = data;
  //     },
  //     error: (error: Error) => {
  //       console.log(error.message);
  //     }
  //   })
  // }

  editProjectDetail(id: number) {
    this.route.navigate(['edit-project-detail', this.id])
  }
}

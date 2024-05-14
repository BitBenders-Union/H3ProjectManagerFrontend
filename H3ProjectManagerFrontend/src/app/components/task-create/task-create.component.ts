import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectTaskDetails } from '../../models/ProjectTask';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectTaskStatus } from '../../models/ProjectTaskStatus';
import { ProjectTaskCategory } from '../../models/ProjectTaskCategory';
import { Priority } from '../../models/Priority';
import { ApiGenericMethodsService } from '../../service/api-generic-methods.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent {
create() {
throw new Error('Method not implemented.');
}


  newTask?: ProjectTaskDetails;

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    projectId: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    projectTaskCategory: new FormControl('', Validators.required),
    users: new FormArray([]),
    comments: new FormControl('', Validators.required),

  });


  statusList: ProjectTaskStatus[] = [];
  categoryList: ProjectTaskCategory[] = [];
  priorityList: Priority[] = [];
  userList: User[] = [];

  constructor(private apiService: ApiGenericMethodsService) { }

  ngOnInit(){
    // get statuslist
    // get categorylist
    // get prioritylist

    this.apiService.getAll<ProjectTaskStatus>('ProjectTaskStatus').subscribe({
      next: (data) => {
        this.statusList = data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });

    this.apiService.getAll<ProjectTaskCategory>('ProjectTaskCategory').subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });

    this.apiService.getAll<Priority>('Priority').subscribe({
      next: (data) => {
        this.priorityList = data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });

    this.apiService.getAll<User>('UserDetails').subscribe({
      next: (data) => {
        this.userList = data;
        console.log(this.userList);
        
      },
      error: (error) => {
        console.log(error.message);
      }
    });


  }

}

import { Component, OnInit,  } from '@angular/core';
import { DataTransferServiceService } from '../../service/DataTransferService.service';
import { ProjectTask, ProjectTaskDetails } from '../../models/ProjectTask';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiGenericMethodsService } from '../../service/api-generic-methods.service';
import { Priority } from '../../models/Priority';
import { ProjectTaskCategory } from '../../models/ProjectTaskCategory';
import { ProjectTaskStatus } from '../../models/ProjectTaskStatus';
import { User } from '../../models/user';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {

  userNotInProject: User[] = []; // List of users NOT in the project

  priorityList: Priority[] = []; // List of priorities from the database
  statusList: ProjectTaskStatus[] = []; // List of statuses from the database
  categoryList: ProjectTaskCategory[] = []; // List of categories from the database

  taskDetails!: ProjectTaskDetails; // Task details which if passed from project-details component

  editForm!: FormGroup; // Form group for the edit fields

  isEditing: boolean = false; // Track if editing task


  constructor(
    private dataService: DataTransferServiceService,
    private fb: FormBuilder,
    private apiService: ApiGenericMethodsService
  ) {}

  ngOnInit() {
    // Get the task details from the project-details component using the data service
    this.dataService.currentMessage.subscribe((item) => {
      this.taskDetails = item as ProjectTaskDetails;
    });

    // Initialize the form group
    this.editForm = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskPriority: ['', Validators.required],
      taskStatus: ['', Validators.required],
      taskCategory: ['', Validators.required],
    });

    // Get all the priorities, statuses and categories from the database
    this.apiService.getAllSimple<Priority>('Priority').subscribe({
      next: (data) => {
        this.priorityList = data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });

    this.apiService.getAllSimple<ProjectTaskStatus>('ProjectTaskStatus').subscribe({
      next: (data) => {
        this.statusList = data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });

    this.apiService.getAllSimple<ProjectTaskCategory>('ProjectTaskCategory').subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });

    this.apiService.getAll<User>('UserDetails').subscribe({
      next: (users) => {
        this.userNotInProject = users.filter((user) => {
          return !this.taskDetails.projectTaskUserDetail?.some((userDetail) => userDetail.id === user.id);
        });
      },
      error: (error) => {
        console.log(error.message);
      }
    });

  }

  // Toggle the visibility of the edit form
  toggleVisibility() {
    this.isEditing = !this.isEditing;



    // If the form is visible, populate the fields with the task details - makes it easier to edit / save / validate the form
    this.editForm.patchValue({
      taskName: this.taskDetails.name,
      taskDescription: this.taskDetails.description,
      taskPriority: this.priorityList.find(item => item.name === this.taskDetails.priority.name),
      taskStatus: this.statusList.find(item => item.name === this.taskDetails.status.name),
      taskCategory: this.categoryList.find(item => item.name === this.taskDetails.projectTaskCategory.name),
    });
  };



  saveButton() {
    if (this.editForm.valid) { // Check if the form is valid
      this.taskDetails.name = this.editForm.value.taskName;
      this.taskDetails.description = this.editForm.value.taskDescription;
      this.taskDetails.priority.name = this.editForm.value.taskPriority.name;
      this.taskDetails.status.name = this.editForm.value.taskStatus.name;
      this.taskDetails.projectTaskCategory.name = this.editForm.value.taskCategory.name;

      // Reset the form and hide it
      this.isEditing = false;


    }
  }


  //  we need to redo this function to work with junction tables
  addUser(user: any) {
    this.taskDetails.projectTaskUserDetail?.push(user);
    this.userNotInProject.splice(this.userNotInProject.indexOf(user), 1);
  }

  // we need to redo this function to work with junction tables
  removeUser(user : any) {
    this.taskDetails.projectTaskUserDetail?.splice( this.taskDetails.projectTaskUserDetail?.indexOf(user), 1);
    this.userNotInProject.push(user);
  }
}

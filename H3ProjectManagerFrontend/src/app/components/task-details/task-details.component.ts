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

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {

  //Temp data start
  users: any = [
    { username: 'user1', firstname: 'John' },
    { username: 'user2', firstname: 'Jane' },
    { username: 'user3', firstname: 'Doe' },
  ];

  listOfUsers: any = [
    { username: 'aliceDev', firstname: 'Alice' },
    { username: 'bobQA', firstname: 'Bob' },
    { username: 'charlieUX', firstname: 'Charlie' },
  ];
  //Temp data end

  priorityList: Priority[] = []; // List of priorities from the database
  statusList: ProjectTaskStatus[] = []; // List of statuses from the database
  categoryList: ProjectTaskCategory[] = []; // List of categories from the database

  taskDetails: any; // Task details which if passed from project-details component

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
      console.log(this.taskDetails); // Remember to remove this line
      
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
    this.apiService.getAllSimple<Priority>('Priority').subscribe((data) => {
      this.priorityList = data;          
    });

    this.apiService.getAllSimple<ProjectTaskStatus>('ProjectTaskStatus').subscribe((data) => {
      this.statusList = data;      
    });

    this.apiService.getAllSimple<ProjectTaskCategory>('ProjectTaskCategory').subscribe((data) => {
      this.categoryList = data;      
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
    console.log('User added');
    this.users.push(user)
    this.listOfUsers.splice(this.listOfUsers.indexOf(user), 1);
  }

  // we need to redo this function to work with junction tables
  removeUser(user : any) {
    console.log('User removed');
    this.users.splice(this.users.indexOf(user), 1);
    this.listOfUsers.push(user);
  }
}

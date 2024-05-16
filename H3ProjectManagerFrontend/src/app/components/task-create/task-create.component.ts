import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectTaskDetails } from '../../models/ProjectTask';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectTaskStatus } from '../../models/ProjectTaskStatus';
import { ProjectTaskCategory } from '../../models/ProjectTaskCategory';
import { Priority } from '../../models/Priority';
import { ApiGenericMethodsService } from '../../service/api-generic-methods.service';
import { User } from '../../models/user';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgMultiSelectDropDownModule
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent {
  


  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    projectId: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    projectTaskCategory: new FormControl('', Validators.required),
    projectTaskUserDetail: new FormControl([], Validators.required),
    comments: new FormControl('', Validators.required),

  });


  statusList: ProjectTaskStatus[] = [];
  categoryList: ProjectTaskCategory[] = [];
  priorityList: Priority[] = [];
  userList: User[] = [];


  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'username',
    
  };


  pDefault: string = 'Select Priority';
  sDefault: string = 'Select Status';
  cDefault: string = 'Select Category';


  // onlySelf: true is used to prevent the form from being marked as dirty
  // when the default value is set

  constructor(private apiService: ApiGenericMethodsService, private routeActive: ActivatedRoute){
    this.taskForm.controls['priority'].setValue(this.pDefault, {onlySelf: true});
    this.taskForm.controls['status'].setValue(this.sDefault, {onlySelf: true});
    this.taskForm.controls['projectTaskCategory'].setValue(this.cDefault, {onlySelf: true});
   }


  ngOnInit(){
    // get statuslist
    // get categorylist
    // get prioritylist
    // get userlist

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
        
      },
      error: (error) => {
        console.log(error.message);
      }
    });

    // get id from route

    this.routeActive.paramMap.subscribe({
      next: (params) => {
        const id = Number(params.get('id'));
        this.taskForm.controls['projectId'].setValue(id);
      }
    });


  }


  cancel() {
    throw new Error('Method not implemented.');

  }


  create() {
    const newTask: ProjectTaskDetails = { ...this.taskForm.value };

    let temp: any[] = [];

    newTask.projectTaskUserDetail?.forEach((element: any) => {
      temp.push(this.userList.find((user) => user.id === element.id));
    });

    newTask.projectTaskUserDetail = temp;
    newTask.comments = [];

    console.log(newTask);

  }




}

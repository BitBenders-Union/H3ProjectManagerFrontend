import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { LocalProject } from '../../models/LocalJson';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Project } from '../../models/Project';
import { Department } from '../../models/Department';
import { single } from 'rxjs';
import { ApiGenericMethodsService } from '../../service/api-generic-methods.service';
import { User } from '../../models/user';
import { trigger } from '@angular/animations';
import { Priority } from '../../models/Priority';
import { ProjectCategory } from '../../models/ProjectCategory';
import { ProjectStatus } from '../../models/ProjectStatus';


@Component({
  selector: 'app-edit-project-details',
  standalone: true,
  imports: [NgMultiSelectDropDownModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-project-details.component.html',
  styleUrl: './edit-project-details.component.css'
})
export class EditProjectDetailsComponent implements OnInit{
  
  constructor(private routeActive: ActivatedRoute, private http: HttpClient, private service: ApiGenericMethodsService) {}
  departmentList: Department[] = [];
  userList: User[] = [];
  priorityList: Priority[] = [];
  categoryList: ProjectCategory[] = [];
  statusList: ProjectStatus[] = [];
  sendProject: Project = {};

  loc: LocalProject = {}
  departmentDropdownSettings: any = {};
  userDropdownSettings: any = {};
  dropdownSettings: any = {};

  editForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    startDate: new FormControl('', [Validators.required,]),
    endDate: new FormControl('', [Validators.required,]),
    status: new FormControl('', [Validators.required,]),
    category: new FormControl('', [Validators.required,]),
    priority: new FormControl('', [Validators.required,]),
    departments: new FormControl([], [Validators.required,]),
    users: new FormControl([], [Validators.required,])

  });


  ngOnInit(){
    let id = this.routeActive.snapshot.paramMap.get('id');
    this.tempJsonProjectDetail();
    this.getDepartments();
    this.getUsers();
    this.getPriorities();
    this.getCategories();
    this.getStatuses();
    this.departmentDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
    }
    this.userDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'username',
    }
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
    }
    // this.patchData();
  }

  patchData(){
    this.editForm.patchValue({
      name: this.loc.name,
      startDate: new Date(this.loc.startDate!),
      endDate: new Date(this.loc.endDate!),
      status: [this.loc.status],
      category: [this.loc.category],
      priority: [this.loc.priority],
      departments: this.loc.departments,
      users: this.loc.users
    });
  }

  getDepartments(){
    this.service.getAllSimple<Department>('Department').subscribe({
      next: (data) => {
        this.departmentList = data;
        // console.log(this.departmentList);
        
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getUsers() {
    this.service.getAllSimple<User>('Auth').subscribe({
      next: (data) => {
        this.userList = data;
        // console.log(this.userList);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getPriorities(){
    this.service.getAllSimple<Priority>('Priority').subscribe({
      next: (data) => {
        this.priorityList = data;
        // console.log(this.priorityList);
      }
    })
  }

  getCategories(){
    this.service.getAllSimple<ProjectCategory>('ProjectCategory').subscribe({
      next: (data) => {
        this.categoryList = data;
        // console.log(this.categoryList);
      }
    })
  }

  getStatuses(){
    this.service.getAllSimple<ProjectStatus>('ProjectStatus').subscribe({
      next: (data) => {
        this.statusList = data;
        // console.log(this.statusList);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.patchData();
      }
    })
  }


  // All the json data this is test data
  //------------------------------------------------------

  tempJsonProjectDetail(){
    this.http.get<LocalProject>("./assets/json/temp-project-detail.json").subscribe({
      next:(data) => {
        this.loc = data;
        // console.log(this.loc);
      }
    })
  }

  tempPost(){
    this.sendProject = this.editForm.value;
    console.log(this.sendProject);
    this.http.put<LocalProject>("./assets/json/temp-project-detail.json", this.sendProject);    
  }
  //---------------------------------------------------------------
  
}

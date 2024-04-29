import { Project, ProjectCreate } from './../../models/Project';
import { Priority } from './../../models/Priority';
import { ApiGenericMethodsService } from './../../service/api-generic-methods.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectStatus } from '../../models/ProjectStatus';
import { ProjectCategory } from '../../models/ProjectCategory';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css', '../../app.component.css']
})
export class ProjectCreateComponent implements OnInit {
  
  projectForm!: FormGroup
  statusList: ProjectStatus[] = [];
  categoryList: ProjectCategory[] = [];
  priorityList: Priority[] = [];
  projectModel?: ProjectCreate;

  formIsValid: boolean = true;

  constructor(private service : ApiGenericMethodsService, private route: Router ) { }

  ngOnInit(): void {

    // create fromcontrols for formgroup
    this.projectForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      startDate: new FormControl("", [
        Validators.required,
      ]),
      endDate: new FormControl("", Validators.required),
      statusIndex: new FormControl("", Validators.required),
      categoryIndex: new FormControl("", Validators.required),
      priorityIndex: new FormControl("", Validators.required)
    })

    // fetch the required data to the form
    // ownerId get from token
    // categories
    // priority
    // status

    this.service.getAllSimple<ProjectStatus>('ProjectStatus').subscribe({
      next: data => {
        this.statusList = data;
      },
      error: error => {
        console.log(error.message);
        // for testing purposes
        // this.statusList = [{
        //   id: 1,
        //   name: "Active"
        // }]
      }
    })

    this.service.getAllSimple<ProjectCategory>('ProjectCategory').subscribe({
      next: data => {
        this.categoryList = data;
      },
      error: error => {
        console.log(error.message);
        // for testing purposes
        // this.categoryList = [{
        //   id: 1,
        //   name: "Software"
        // }]
      }
    })

    this.service.getAllSimple<Priority>('Priority').subscribe({
      next: data => {
        this.priorityList = data;
      },
      error: error => {
        console.log(error.message);
        // for testing purposes
        // this.priorityList = [{
        //   id: 1,
        //   level: 1,
        //   name: "Low"
        // }]
      }
    })

    // get the current user id from token

  }


  create(){
    this.projectModel = this.projectForm.value;

    this.formToModelMap();

    if(this.projectModel != null || this.projectModel != undefined)
      {
        // TODO: change the hardcoded userId (in the post) to the current user id
        this.service.post<Project, ProjectCreate>("Project", this.projectModel!, 1).subscribe({
          next: data => {
            this.route.navigate(['/project-dashboard'])
          },
          error: error => {
            console.log(error.message);
          }
        })

    }

  }

  formToModelMap() {
    // map the form to the model
    console.log(this.projectForm.get('priority')?.value)
    this.projectModel = {
      name: this.projectForm.get('name')?.value,
      startDate: this.projectForm.get('startDate')?.value,
      endDate: this.projectForm.get('endDate')?.value,
      status: this.statusList[this.projectForm.get('statusIndex')?.value],
      category: this.categoryList[this.projectForm.get('categoryIndex')?.value],
      priority: this.priorityList[this.projectForm.get('priorityIndex')?.value],
      ownerId: 0 // get from token
    }

    console.log(this.projectModel)

  }
  


}



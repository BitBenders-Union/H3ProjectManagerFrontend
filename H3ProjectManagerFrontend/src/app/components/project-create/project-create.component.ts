import { Project, ProjectCreate } from './../../models/Project';
import { Priority } from './../../models/Priority';
import { ApiGenericMethodsService } from './../../service/api-generic-methods.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectStatus } from '../../models/ProjectStatus';
import { ProjectCategory } from '../../models/ProjectCategory';
import { Router } from '@angular/router';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css', '../../app.component.css'],
})
export class ProjectCreateComponent implements OnInit {
  projectForm!: FormGroup;
  statusList: ProjectStatus[] = [];
  categoryList: ProjectCategory[] = [];
  priorityList: Priority[] = [];
  projectModel?: ProjectCreate;

  formIsValid: boolean = true;

  constructor(
    private service: ApiGenericMethodsService,
    private route: Router,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    // create fromcontrols for formgroup
    this.projectForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', Validators.required),
      statusIndex: new FormControl('', Validators.required),
      categoryIndex: new FormControl('', Validators.required),
      priorityIndex: new FormControl('', Validators.required),
    });

    this.service.getAllSimple<ProjectStatus>('ProjectStatus').subscribe({
      next: (data) => {
        this.statusList = data;
      },
      error: (error) => {
        console.log(error.message);
      }
    })

    this.service.getAllSimple<ProjectCategory>('ProjectCategory').subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {
        console.log(error.message);
      }
    })

    this.service.getAllSimple<Priority>('Priority').subscribe({
      next: (data) => {
        this.priorityList = data;
      },
      error: (error) => {
        console.log(error.message);
      }
    })

  }

  create() {

    this.formToModelMap();

    if (this.projectModel != null || this.projectModel != undefined) {
      this.service
        .post<Project, ProjectCreate>('Project', this.projectModel!)
        .subscribe({
          next: (data) => {
            this.route.navigate(['/project-dashboard']);
          },
          error: (error) => {
            console.log(error.message);
          },
        });
    }
  }

  formToModelMap() {
    // map the form to the model
    this.projectModel = {
      id: 0,
      name: this.projectForm.get('name')?.value,
      startDate: this.projectForm.get('startDate')?.value,
      endDate: this.projectForm.get('endDate')?.value,
      status: this.statusList[this.projectForm.get('statusIndex')?.value],
      category: this.categoryList[this.projectForm.get('categoryIndex')?.value],
      priority: this.priorityList[this.projectForm.get('priorityIndex')?.value],
      client: undefined,
      projectTasks: [],
      departments: [],
      users: [this.token.getUserFromToken()!],
      owner: this.token.getUsernameFromToken(),
    };    
    console.log(this.projectModel);
  }
}

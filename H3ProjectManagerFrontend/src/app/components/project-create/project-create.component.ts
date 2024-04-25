import { ProjectCreate } from './../../models/Project';
import { Priority } from './../../models/Priority';
import { ApiGenericMethodsService } from './../../service/api-generic-methods.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent implements OnInit {
  
  projectForm!: FormGroup
  status: ProjectStatus[] = [];
  category: ProjectCategory[] = [];
  priority: Priority[] = [];
  projectModel?: ProjectCreate;

  formIsValid: boolean = true;

  constructor(private service : ApiGenericMethodsService, private route: Router ) { }

  ngOnInit(): void {

    // create fromcontrols for formgroup
    this.projectForm = new FormGroup({
      name: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      status: new FormGroup({
        id: new FormControl(),
        name: new FormControl()
      }),
      category: new FormGroup({
        id: new FormControl(),
        name: new FormControl()
      }),
      priority: new FormGroup({
        id: new FormControl(),
        level: new FormControl(),
        name: new FormControl()
      }),
      ownerId: new FormControl()
    })

    // fetch the required data to the form
    // categories
    // ownerId
    // priority
    // status

    this.service.getAllSimple<ProjectStatus>('ProjectStatus').subscribe({
      next: data => {
        this.status = data;
      }
    })

    this.service.getAllSimple<ProjectCategory>('ProjectCategory').subscribe({
      next: data => {
        this.category = data;
      }
    })

    this.service.getAllSimple<Priority>('Priority').subscribe({
      next: data => {
        this.priority = data;
      }
    })

    


    
    // this.service.getAddress();
  }


  create(){
    this.projectModel = this.projectForm.value;
    if(this.formIsValid)
      this.route.navigate(['/project-dashboard']);

  }


}

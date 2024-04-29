import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';import { Department } from '../../../../models/Department';
import { ApiGenericMethodsService } from '../../../../service/api-generic-methods.service';

@Component({
  selector: 'app-adminpage-department',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  standalone: true,
  templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
  //templateUrl: './adminpage-department.component.html', // This is the standard html file
  //styleUrls: ['./adminpage-department.component.css'], // This is the standard css file
})
export class AdminpageDepartmentComponent implements OnInit {

  heading: string = "Afdelinger";
  addEntityHeading: string = "Tilføj afdeling";
  labelName: string = "Afdeling navn:";
  addButtonText: string = "Tilføj afdeling";

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

   // Temp data
  entityList : Department[] = [];

  newEntity : Department = new Department();

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor( 
    private fb: FormBuilder,
    private apiService: ApiGenericMethodsService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      // name: ['', Validators.required],
      name: [''],
    });
    this.editForm = this.fb.group({
      newName: ['', Validators.required],
    });

    this.apiService.getAllSimple<Department>('Department').subscribe((data) => {
      this.entityList = data;
    });
  }

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addButton() {    
    if (this.registerForm.valid) {
      this.newEntity = this.registerForm.value;
      this.registerForm.reset();
    }

    this.apiService.post<Department, Department>('Department', this.newEntity, undefined)
      .subscribe((data) => {
        this.entityList.push(data);
      });
  }

  editButton(entity: any) {
    this.isEditing = this.isEditing === entity ? null : entity;
  }

  saveButton(entity: any) {
    if (this.editForm.valid) { // Check if the form is valid
      entity.name = this.editForm.value.newName; // Save the new name
      this.editForm.reset(); // Clear the input field
    }
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: any) {
    this.apiService.delete<Department, number>('Department', entity.id).subscribe(data => {
      this.entityList = this.entityList.filter((t) => t.id !== entity.id);
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';import { Department } from '../../../../models/Department';

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
  entityList : Department[] = [
    { name: 'Department 1' },
    { name: 'Department 2' },
    { name: 'Department 3' },
    { name: 'Department 4' },
    { name: 'Department 5' }
  ];

  newEntity : Department = new Department();

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      // name: ['', Validators.required],
      name: [''],
    });
    this.editForm = this.fb.group({
      newName: ['', Validators.required],
    });
  }

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addButton() {    
    if (this.registerForm.valid) {
      this.newEntity = this.registerForm.value;
      this.entityList.push(this.newEntity);
      this.registerForm.reset();
    }
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
    this.entityList.splice(this.entityList.indexOf(entity), 1);
  }
}

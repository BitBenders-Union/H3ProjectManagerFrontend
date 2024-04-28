import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';
import { Project } from '../../../../models/Project';
import { ProjectCategory } from '../../../../models/ProjectCategory';

@Component({
  selector: 'app-adminpage-projectcategory',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
  // templateUrl: './adminpage-projectcategory.component.html', // This is the standard html file
  // styleUrls: ['./adminpage-projectcategory.component.css'] // This is the standard css file
})
export class AdminpageProjectcategoryComponent implements OnInit {

  heading: string = "Projekt kategorier";
  addEntityHeading: string = "Tilføj projekt kategori";
  labelName: string = "Projekt kategori navn:";
  addButtonText: string = "Tilføj projekt kategori";

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

  // Temp data
  entityList : ProjectCategory[] = [
    { name: 'Project category 1' },
    { name: 'Project category 2' },
    { name: 'Project category 3' },
    { name: 'Project category 4' },
    { name: 'Project category 5' }
  ];

  newEntity : ProjectCategory = { name: '' };

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
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
    this.isEditing =
    this.isEditing === entity ? null : entity;
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

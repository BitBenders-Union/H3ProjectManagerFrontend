import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';
import { ProjectStatus } from '../../../../models/ProjectStatus';

@Component({
  selector: 'app-adminpage-projectstatus',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  standalone: true,
  templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
  // templateUrl: './adminpage-projectstatus.component.html',
  // styleUrls: ['./adminpage-location.component.css'] // This is the standard css file
})
export class AdminpageProjectstatusComponent implements OnInit {

  heading: string = "Projekt statusser";
  addEntityHeading: string = "Tilføj projekt status";
  labelName: string = "Projekt status navn:";
  addButtonText: string = "Tilføj projekt status";

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

  // Temp data
  entityList : ProjectStatus[] = [
    { name: 'Projekt status 1' },
    { name: 'Projekt status 2' },
    { name: 'Projekt status 3' },
    { name: 'Projekt status 4' },
    { name: 'Projekt status 5' }
  ];

  newEntity : ProjectStatus = { name: '' };

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
    this.isEditing = this.isEditing === entity ? null : entity;
  }

  saveButton(entity: any) {
    if (this.editForm.valid) {
      entity.name = this.editForm.value.newName;
      this.editForm.reset(); // Clear the input field
    }
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: any) {
    this.entityList.splice(this.entityList.indexOf(entity), 1);
  }
}

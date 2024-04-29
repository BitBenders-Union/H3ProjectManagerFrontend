import { Role } from './../../../../models/Role';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';
@Component({
  selector: 'app-adminpage-role',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './adminpage-role.component.html',
  styleUrls: ['./adminpage-role.component.css']
})
export class AdminpageRoleComponent implements OnInit {

  heading: string = "Roller";
  addEntityHeading: string = "Tilføj rolle";
  labelName: string = "Rolle navn:";
  labelDescription: string = "Beskrivelse:";
  addButtonText: string = "Tilføj rolle";

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

  // Temp data
  entityList : Role[]= [
    { name: 'Role 1', description: 'Role 1 description', isActive : true},
    { name: 'Role 2', description: 'Role 2 description', isActive : true},
    { name: 'Role 3', description: 'Role 3 description', isActive : true},
    { name: 'Role 4', description: 'Role 4 description', isActive : true},
    { name: 'Role 5', description: 'Role 5 description', isActive : false}

  ];

  newEntity : Role = { name: '', description: '', isActive: true};

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.editForm = this.fb.group({
      newName: ['', Validators.required],
      newDescription: ['', Validators.required],
      newIsActive: [true, Validators.required]
    });
  }

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addButton() {
    this.entityList.push(this.newEntity);
    this.newEntity = { name: '', description: '', isActive: true};  // Clear the input field
  }

  editButton(entity: any) {
    this.isEditing =
    this.isEditing === entity ? null : entity;
  }

  saveButton(entity: any) {
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: any) {
    this.entityList.splice(this.entityList.indexOf(entity), 1);
  }

}

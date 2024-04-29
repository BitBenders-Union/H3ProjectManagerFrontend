import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';
import { Priority } from '../../../../models/Priority';

@Component({
  selector: 'app-adminpage-priority',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
   templateUrl: './adminpage-priority.component.html', // This is the standard html file
  styleUrls: ['./adminpage-priority.component.css'], // This is the standard css file
})
export class AdminpagePriorityComponent implements OnInit {

  heading: string = "Prioriteter";
  addEntityHeading: string = "Tilføj prioritet";
  labelName: string = "Prioritets navn:";
  labelLevel: string = 'Prioritets Level:';
  addButtonText: string = "Tilføj prioritet";

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

  // Temp data
  entityList : Priority[]= [
    { name: 'Priority 1', level: 1 },
    { name: 'Priority 2', level: 2 },
    { name: 'Priority 3', level: 3 },
    { name: 'Priority 4', level: 4 },
    { name: 'Priority 5', level: 5 }

  ];

  newEntity : Priority = { name: '', level: 0 }; // For adding new entity and reseting the input fields

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required]
    });
    this.editForm = this.fb.group({
      newName: ['', Validators.required],
      newLevel: ['', Validators.required]
    });
  }

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addButton() {
    this.entityList.push(this.newEntity);
    this.newEntity = { name: '' };  // Clear the input field
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

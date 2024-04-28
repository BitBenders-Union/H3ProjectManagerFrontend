import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';

@Component({
  selector: 'app-adminpage-generic',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './adminpage-generic.component.html',
  styleUrls: ['./adminpage-generic.component.css']
})
export class AdminpageGenericComponent implements OnInit {

  heading: string = "Generic heading";
  addEntityHeading: string = "Generic add entity heading";
  labelName: string = "Generic label name";
  addButtonText: string = "Gereric add button text";

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

  // Temp data
  entityList = [
    { name: 'Something 1' },
    { name: 'Something 2' },
    { name: 'Something 3' },
    { name: 'Something 4' },
    { name: 'Something 5' }    
  ];

  newEntity = { name: '' };

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
    console.log(this.registerForm.value);
    this.newEntity = this.registerForm.value;
    this.entityList.push(this.newEntity);
    this.registerForm.reset();
    
  }

  editButton(entity: any) {
    // Toggle editing, if isEditing is null, set it to the entity, else set it to null
    // This will show the edit form for the entity
    this.isEditing = this.isEditing === entity ? null : entity;
  }

  saveButton(entity: any) {
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: any) {
    this.entityList.splice(this.entityList.indexOf(entity), 1);
  }

}

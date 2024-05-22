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
      name: ['', Validators.required],
    });
  }

  //Methodes in this component are not implemented, they are just placeholders for the real methods in the child components,
  //otherwise the html file will not work.

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addButton() {

  }

  editButton(entity: any) {
    // if isEditing is the same as the entity, set isEditing to null, else set isEditing to the entity,
    // ngIF in the html file will then show the edit form if isEditing is equal to the entity,
    // when "save" is clicked, isEditing is set to null and the form is hidden
    this.isEditing = this.isEditing === entity ? null : entity;
  }

  saveButton(entity: any) {

  }

  deleteButton(entity: any) {

  }

}

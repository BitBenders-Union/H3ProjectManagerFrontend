import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';
import { Project } from '../../../../models/Project';
import { ProjectTaskCategory } from '../../../../models/ProjectTaskCategory';
import { ApiGenericMethodsService } from '../../../../service/api-generic-methods.service';

@Component({
  selector: 'app-adminpage-projecttaskcategory',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
  // templateUrl: './adminpage-projecttaskcategory.component.html', // This is the standard html file
  // styleUrls: ['./adminpage-projecttaskcategory.component.css'] // This is the standard css file
})
export class AdminpageProjecttaskcategoryComponent implements OnInit {

  heading: string = "Opgave kategorier";
  addEntityHeading: string = "Tilføj opgave kategori";
  labelName: string = "Opgave kategori navn:";
  addButtonText: string = "Tilføj opgave kategori";

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

  // Temp data
  entityList : ProjectTaskCategory[] = [];

  newEntity : ProjectTaskCategory = { name: '' };

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor(
    private fb: FormBuilder,
    private apiService: ApiGenericMethodsService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      newName: ['', Validators.required],
    });

    this.apiService.getAllSimple<ProjectTaskCategory>('ProjectTaskCategory').subscribe((data) => {
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

      this.apiService.post<ProjectTaskCategory, ProjectTaskCategory>('ProjectTaskCategory', this.newEntity).subscribe((data) => {
        this.entityList.push(data);
      });
    }
  }

  editButton(entity: any) {
    // if isEditing is the same as the entity, set isEditing to null, else set isEditing to the entity,
   // ngIF in the html file will then show the edit form if isEditing is equal to the entity,
    // when "save" is clicked, isEditing is set to null and the form is hidden
    this.isEditing = this.isEditing === entity ? null : entity;
  }

  saveButton(entity: any) {
    if (this.editForm.valid) { // Check if the form is valid
      this.newEntity = this.editForm.value; // Set the new entity to the value of the form
      this.editForm.reset(); // Clear the input field

      // Needs the update method

    }
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: any) {
    this.apiService.delete<ProjectTaskCategory, number>('ProjectTaskCategory', entity.id).subscribe(() => {
      this.entityList.splice(this.entityList.indexOf(entity), 1);
    });
  }

}

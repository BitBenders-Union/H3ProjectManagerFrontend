import { Login } from './../../../../models/Login';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectLocation } from '../../../../models/ProjectLocation';
import { ApiGenericMethodsService } from './../../../../service/api-generic-methods.service';

@Component({
  selector: 'app-adminpage-location',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './adminpage-location.component.html', // This is the standard html file
  styleUrls: ['./adminpage-location.component.css'], // This is the standard css file
})
export class AdminpageLocationComponent implements OnInit {

  // Variables for the html file
  heading: string = 'Lokationer';
  addEntityHeading: string = 'Tilføj lokation';
  labelName: string = 'Lokation navn:';
  labelAddress: string = 'Lokation Adresse:';
  addButtonText: string = 'Tilføj lokation';

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

  // List of entities to be displayed when the page is loaded gets data from the database from onInit
  entityList: ProjectLocation[] = [];

  //For adding new entity and reseting the input fields
  newEntity: ProjectLocation = new ProjectLocation();

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor(
    private fb: FormBuilder,
    private apiService: ApiGenericMethodsService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.apiService
      .getAllSimple<ProjectLocation>('Location')
      .subscribe((data) => {
        this.entityList = data;
      });
  }

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed; // Toggle the visibility of the form
  }

  addButton() {
    if(this.registerForm.valid) {
      this.newEntity = this.registerForm.value;
      this.registerForm.reset(); // Clear the input field

      this.apiService.post<ProjectLocation, ProjectLocation>('Location', this.newEntity, undefined)
      .subscribe((data) => {
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
    this.apiService.delete<ProjectLocation, number>('Location', entity.id).subscribe(data => {      
      this.entityList = this.entityList.filter(item => item.id !== entity.id);
      // Compare the id of the entity we want to delete with the id of the entities in the list in "ts file"
      // If the id is the same, remove the entity from the list else keep it.       
    });
  }
}

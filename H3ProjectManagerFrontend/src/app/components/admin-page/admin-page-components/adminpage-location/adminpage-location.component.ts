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
import { Department } from '../../../../models/Department';

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
    if (this.registerForm.valid) {
      this.newEntity = this.registerForm.value;
      console.log(this.newEntity);
      this.registerForm.reset(); // Clear the input field

      this.apiService
        .post<ProjectLocation, ProjectLocation>(
          'Location',
          this.newEntity,
          undefined
        )
        .subscribe((data) => {
          this.entityList.push(data);
        });
    }
  }

  editButton(entity: ProjectLocation) {
    // if isEditing is the same as the entity, set isEditing to null, else set isEditing to the entity,
    // ngIF in the html file will then show the edit form if isEditing is equal to the entity,
    // when "save" is clicked, isEditing is set to null and the form is hidden
    this.isEditing = this.isEditing === entity ? null : entity;

    //set editform input fields to the values of the entity
    this.editForm.setValue({
      name: entity.name,
      address: entity.address,
    });
  }

  saveButton(entity: ProjectLocation) {
    if (this.editForm.valid) {
      // Check if the form is valid
      this.newEntity = this.editForm.value; // Sets the newEntity to the value of the input field
      this.newEntity.id = entity.id; // Set the id of the newEntity to the id of the entity

      // Update the entity in the database
      this.apiService
        .update<boolean, ProjectLocation>('Location', this.newEntity)
        .subscribe((data: boolean) => {
          if (data) {
            // if data is true, update the entity in the list in "ts file"
            entity.name = this.newEntity.name;
            entity.address = this.newEntity.address;
          }
        });
      this.editForm.reset(); // Clear the input field
    }
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: ProjectLocation) {
    this.apiService
      .delete<ProjectLocation, number>('Location', entity.id!)
      .subscribe((data) => {
        // Filters the 'entityList' to remove the entity with a specific 'id'.
        //The new list will only include entities whose 'id' does not match the 'id' of the given entity.
        this.entityList = this.entityList.filter(
          (item) => item.id !== entity.id
        );
      });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectTaskStatus } from '../../../../models/ProjectTaskStatus';
import { ApiGenericMethodsService } from '../../../../service/api-generic-methods.service';

@Component({
  selector: 'app-adminpage-projecttaskstatus',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
  // templateUrl: './adminpage-projecttaskstatus.component.html', // This is the standard html file
  // styleUrls: ['./adminpage-location.component.css'] // This is the standard css file
})
export class AdminpageProjecttaskstatusComponent implements OnInit {
  heading: string = 'Opgave status';
  addEntityHeading: string = 'Tilføj opgave status';
  labelName: string = 'Opgave status navn:';
  addButtonText: string = 'Tilføj opgave status';

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

  // Temp data
  entityList: ProjectTaskStatus[] = [];

  newEntity: ProjectTaskStatus = new ProjectTaskStatus();

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor(
    private fb: FormBuilder,
    private apiService: ApiGenericMethodsService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.apiService
      .getAllSimple<ProjectTaskStatus>('ProjectTaskStatus')
      .subscribe((data) => {
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

      this.apiService
        .post<ProjectTaskStatus, ProjectTaskStatus>(
          'ProjectTaskStatus',
          this.newEntity
        )
        .subscribe((data) => {
          this.entityList.push(data);
        });
    }
  }

  editButton(entity: ProjectTaskStatus) {
    // if isEditing is the same as the entity, set isEditing to null, else set isEditing to the entity,
    // ngIF in the html file will then show the edit form if isEditing is equal to the entity,
    // when "save" is clicked, isEditing is set to null and the form is hidden
    this.isEditing = this.isEditing === entity ? null : entity;

    this.editForm.setValue({
      name: entity.name,
    });
  }

  saveButton(entity: ProjectTaskStatus) {
    if (this.editForm.valid) {
      // Check if the form is valid
      this.newEntity = this.editForm.value; // Sets the newEntity to the value of the input field
      this.newEntity.id = entity.id; // Set the id of the newEntity to the id of the entity

      // Update the entity in the database
      this.apiService
        .update<boolean, ProjectTaskStatus>('ProjectTaskStatus', this.newEntity)
        .subscribe((data: boolean) => {
          if (data) {
            // if data is true, update the entity in the list in "ts file"
            entity.name = this.newEntity.name;
          }
        });
      this.editForm.reset(); // Clear the input field
    }
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: ProjectTaskStatus) {
    this.apiService
      .delete<ProjectTaskStatus, number>('ProjectTaskStatus', entity.id!)
      .subscribe((data) => {
        // Filters the 'entityList' to remove the entity with a specific 'id'.
        //The new list will only include entities whose 'id' does not match the 'id' of the given entity.
        this.entityList = this.entityList.filter((x) => x.id !== entity.id);
      });
  }
}

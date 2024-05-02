import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';
import { Priority } from '../../../../models/Priority';
import { ApiGenericMethodsService } from '../../../../service/api-generic-methods.service';

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
  entityList : Priority[]= [];

  newEntity : Priority = { name: '', level: 0 }; // For adding new entity and reseting the input fields

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor(
    private fb: FormBuilder,
    private apiService: ApiGenericMethodsService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required]
    });
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required]
    });

    this.apiService.getAllSimple<Priority>('Priority').subscribe((data) => {
      this.entityList = data;
    });
  }

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addButton() {
    console
    if (this.registerForm.valid) {
      this.newEntity = this.registerForm.value;
      this.registerForm.reset();

      this.apiService.post<Priority, Priority>('Priority', this.newEntity).subscribe((data) => {
        this.entityList.push(data);
      });
    }
  }

  editButton(entity: Priority) {
    // if isEditing is the same as the entity, set isEditing to null, else set isEditing to the entity,
    // ngIF in the html file will then show the edit form if isEditing is equal to the entity,
    // when "save" is clicked, isEditing is set to null and the form is hidden
    this.isEditing = this.isEditing === entity ? null : entity;

    this.editForm.setValue({
      name: entity.name,
      level: entity.level
    });
  }

  saveButton(entity: Priority) {
    if (this.editForm.valid) {
      // Check if the form is valid
      this.newEntity = this.editForm.value; // Sets the newEntity to the value of the input field
      this.newEntity.id = entity.id; // Set the id of the newEntity to the id of the entity

      // Update the entity in the database
      this.apiService
        .update<boolean, Priority>('Priority', this.newEntity)
        .subscribe((data: boolean) => {
          if (data) {
            // if data is true, update the entity in the list in "ts file"
            entity.name = this.newEntity.name;
            entity.level = this.newEntity.level;
          }
        });
      this.editForm.reset(); // Clear the input field
    }
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: Priority) {
    this.apiService.delete<Priority, number>('Priority', entity.id!).subscribe(data => {
      this.entityList = this.entityList.filter((e) => e !== entity);
    });
  }
}

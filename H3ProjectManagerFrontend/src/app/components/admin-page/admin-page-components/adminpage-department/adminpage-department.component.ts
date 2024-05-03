import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Department } from '../../../../models/Department';
import { ApiGenericMethodsService } from '../../../../service/api-generic-methods.service';

@Component({
  selector: 'app-adminpage-department',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
  //templateUrl: './adminpage-department.component.html', // This is the standard html file of the component, it has been out commented because the generic component is used
  //styleUrls: ['./adminpage-department.component.css'], // This is the standard css file of the component, it has been out commented because the generic component is used
})
export class AdminpageDepartmentComponent implements OnInit {
  heading: string = 'Afdelinger';
  addEntityHeading: string = 'Tilføj afdeling';
  labelName: string = 'Afdeling navn:';
  addButtonText: string = 'Tilføj afdeling';

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

  // List of entities to be displayed when the page is loaded gets data from the database from api call in onInit
  entityList: Department[] = [];

  //For adding new entity and reseting the input fields
  newEntity: Department = new Department();

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

    this.apiService.getAllSimple<Department>('Department').subscribe((data) => {
      this.entityList = data;
    });
  }

  // Function to toggle the visibility of the edit form
  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addButton() {
    if (this.registerForm.valid) {
      this.newEntity = this.registerForm.value;
      this.registerForm.reset();

      this.apiService
        .post<Department, Department>('Department', this.newEntity, undefined)
        .subscribe((data) => {
          this.entityList.push(data);
        });
    }
  }

  editButton(entity: Department) {
    // if isEditing is the same as the entity, set isEditing to null, else set isEditing to the entity,
    // ngIF in the html file will then show the edit form if isEditing is equal to the entity,
    // when "save" is clicked, isEditing is set to null and the form is hidden
    this.isEditing = this.isEditing === entity ? null : entity;

    // Set the value of the input field to the current name of the entity
    this.editForm.setValue({
      name: entity.name,
    });
  }

  saveButton(entity: Department) {
    if (this.editForm.valid) {
      // Check if the form is valid
      this.newEntity = this.editForm.value; // Sets the newEntity to the value of the input field
      this.newEntity.id = entity.id; // Set the id of the newEntity to the id of the entity

      // Update the entity in the database
      this.apiService
        .update<boolean, Department>('Department', this.newEntity)
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

  deleteButton(entity: Department) {
    this.apiService
      .delete<boolean, number>('Department', entity.id!)
      .subscribe((data) => {
        // Filters the 'entityList' to remove the entity with a specific 'id'.
        //The new list will only include entities whose 'id' does not match the 'id' of the given entity.F
        this.entityList = this.entityList.filter((t) => t.id !== entity.id);
      });
  }
}

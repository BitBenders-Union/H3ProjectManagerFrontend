import { Role } from './../../../../models/Role';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiGenericMethodsService } from '../../../../service/api-generic-methods.service';
@Component({
  selector: 'app-adminpage-role',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './adminpage-role.component.html',
  styleUrls: ['./adminpage-role.component.css'],
})
export class AdminpageRoleComponent implements OnInit {
  heading: string = 'Roller';
  addEntityHeading: string = 'Tilføj rolle';
  labelName: string = 'Rolle navn:';
  labelDescription: string = 'Beskrivelse:';
  addButtonText: string = 'Tilføj rolle';

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

  // Temp data
  entityList: Role[] = [];

  newEntity: Role = new Role();

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor(
    private fb: FormBuilder,
    private apiService: ApiGenericMethodsService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [false, ],
    });
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [false, ],
    });

    this.apiService.getAllSimple<Role>('Role').subscribe((data) => {
      this.entityList = data;
    });
  }

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addButton() {
    if (this.registerForm.valid) {
      this.newEntity = this.registerForm.value;

      this.apiService
        .post<Role, Role>('Role', this.newEntity)
        .subscribe((data) => {
          this.entityList.push(data);
        });

      this.registerForm.reset();
    }
  }

  editButton(entity: Role) {
    // if isEditing is the same as the entity, set isEditing to null, else set isEditing to the entity,
    // ngIF in the html file will then show the edit form if isEditing is equal to the entity,
    // when "save" is clicked, isEditing is set to null and the form is hidden
    this.isEditing = this.isEditing === entity ? null : entity;
  }

  saveButton(entity: Role) {
    if (this.editForm.valid) {
      // Check if the form is valid
      this.newEntity = this.editForm.value; // Sets the newEntity to the value of the input field
      this.newEntity.id = entity.id; // Set the id of the newEntity to the id of the entity

      // Update the entity in the database
      this.apiService
        .update<boolean, Role>('Role', this.newEntity)
        .subscribe((data: boolean) => {
          console.log(data);
          if (data) {
            // if data is true, update the entity in the list in "ts file"
            entity.name = this.newEntity.name;
            entity.description = this.newEntity.description;
            entity.isActive = this.newEntity.isActive;
          }
        });
      this.editForm.reset(); // Clear the input field
    }
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: Role) {
    this.apiService.delete<Role, number>('Role', entity.id!).subscribe((data) => {
      this.entityList.splice(this.entityList.indexOf(entity), 1);
    });
  }
}

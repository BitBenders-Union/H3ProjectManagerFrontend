import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectCategory } from '../../../../models/ProjectCategory';
import { ApiGenericMethodsService } from '../../../../service/api-generic-methods.service';

@Component({
  selector: 'app-adminpage-projectcategory',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
  // templateUrl: './adminpage-projectcategory.component.html', // This is the standard html file
  // styleUrls: ['./adminpage-projectcategory.component.css'] // This is the standard css file
})
export class AdminpageProjectcategoryComponent implements OnInit {
  heading: string = 'Projekt kategorier';
  addEntityHeading: string = 'Tilføj projekt kategori';
  labelName: string = 'Projekt kategori navn:';
  addButtonText: string = 'Tilføj projekt kategori';

  registerForm!: FormGroup; // Form group for the input fields
  editForm!: FormGroup; // Form group for the edit fields

  // Temp data
  entityList: ProjectCategory[] = [];

  newEntity: ProjectCategory = { name: '' };

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
      newName: ['', Validators.required],
    });

    this.apiService
      .getAllSimple<ProjectCategory>('ProjectCategory')
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
        .post<ProjectCategory, ProjectCategory>('ProjectCategory', this.newEntity)
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
    this.apiService.delete<ProjectCategory, number>('ProjectCategory', entity.id).subscribe((data) => {
      this.entityList = this.entityList.filter((e) => e !== entity);
    });
  }
}

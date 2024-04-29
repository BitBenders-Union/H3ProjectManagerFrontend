import { ApiGenericMethodsService } from './../../../../service/api-generic-methods.service';
import { HttpClient } from '@angular/common/http';
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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adminpage-location',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './adminpage-location.component.html', // This is the standard html file
  styleUrls: ['./adminpage-location.component.css'], // This is the standard css file
})
export class AdminpageLocationComponent implements OnInit {
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
      newName: ['', Validators.required],
      newAddress: ['', Validators.required],
    });

    this.apiService
      .getAllSimple<ProjectLocation>('Location')
      .subscribe((data) => {
        this.entityList = data;
        console.log(this.entityList);
      });
  }

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed; // Toggle the visibility of the form
  }

  addButton() {
    if(this.registerForm.valid) {
      this.newEntity = this.registerForm.value;
    }

    this.apiService.post<ProjectLocation, ProjectLocation>('Location', this.newEntity, undefined)
      .subscribe((data) => {
        this.entityList.push(data);
      });
    this.registerForm.reset(); // Clear the input field
  }

  editButton(entity: any) {
    this.isEditing = this.isEditing === entity ? null : entity;
  }

  saveButton(entity: any) {
    this.isEditing = null; // Stop editing after saving
    if (this.editForm.valid) {
      entity.name = this.editForm.get('newName')?.value;
      entity.address = this.editForm.get('newAddress')?.value;
    }
  }

  deleteButton(entity: any) {
    this.apiService.delete<ProjectLocation, number>('Location?id=', entity.id).subscribe(data => {
      // Compare the id of the entity we want to delete with the id of the entities in the list
      // If the id is the same, remove the entity from the list else keep it
      this.entityList = this.entityList.filter(item => item.id !== entity.id);
    });
  }
}

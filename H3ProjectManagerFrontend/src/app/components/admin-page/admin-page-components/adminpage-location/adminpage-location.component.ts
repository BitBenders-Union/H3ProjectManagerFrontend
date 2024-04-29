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



  //Temp data - will be replaced by API call
  entityList: ProjectLocation[] = [
    // { id: 0, name: 'Location 1', address: 'Address 1' },
    // { id: 1, name: 'Location 2', address: 'Address 2' },
    // { id: 2, name: 'Location 3', address: 'Address 3' },
    // { id: 3, name: 'Location 4', address: 'Address 4' },
    // { id: 4, name: 'Location 5', address: 'Address 5' },
  ];

  //For adding new entity and reseting the input fields
  newEntity: ProjectLocation = new ProjectLocation();

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor(private fb: FormBuilder, private apiService : ApiGenericMethodsService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      newName: ['', Validators.required],
      newAddress: ['', Validators.required],
    });

    this.apiService.getAllSimple<ProjectLocation>('Location').subscribe(data => {
      this.entityList = data;
    });
  }

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addButton() {
    console.log(this.registerForm.value);
    this.newEntity = this.registerForm.value;
    this.entityList.push(this.newEntity);
    this.registerForm.reset(); // Clear the input field
  }

  editButton(entity: any) {
    this.isEditing = this.isEditing === entity ? null : entity;
  }

  saveButton(entity: any) {
    this.isEditing = null; // Stop editing after saving
    if (this.editForm.valid){
      entity.name = this.editForm.get('newName')?.value;
      entity.address = this.editForm.get('newAddress')?.value;
    }
  }

  saveEditButton(entity: any) {
    if (this.editForm.valid) {
      const updatedEntity = {
        ...entity, // Spread operator to copy existing properties
        name: this.editForm.get('name')?.value,
        address: this.editForm.get('address')?.value,
      };
      this.entityList[this.entityList.indexOf(entity)] = updatedEntity;
      this.isEditing = null;
    }
  }

  deleteButton(entity: any) {
    this.entityList.splice(this.entityList.indexOf(entity), 1);
  }
}

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

  newEntity: Role = { name: '', description: '', isActive: true };

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
      isActive: [true, Validators.required],
    });
    this.editForm = this.fb.group({
      newName: ['', Validators.required],
      newDescription: ['', Validators.required],
      newIsActive: [true, Validators.required],
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

  editButton(entity: any) {
    this.isEditing = this.isEditing === entity ? null : entity;
  }

  saveButton(entity: any) {
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: any) {
    this.apiService.delete<Role, number>('Role', entity.id).subscribe((data) => {
      this.entityList.splice(this.entityList.indexOf(entity), 1);
    });
  }
}

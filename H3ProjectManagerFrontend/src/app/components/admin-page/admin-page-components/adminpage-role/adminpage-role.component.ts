import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage-role',
  imports: [ CommonModule, FormsModule, ],
  standalone: true,
  templateUrl: './adminpage-role.component.html',
  styleUrls: ['./adminpage-role.component.css']
})
export class AdminpageRoleComponent implements OnInit {

  heading: string = "Roller";
  addEntityHeading: string = "Tilføj rolle";
  labelName: string = "Rolle navn:";
  labelDescription: string = "Beskrivelse:";
  addButtonText: string = "Tilføj rolle";

  // Temp data
  entityList = [
    { name: 'Role 1', description: 'Role 1 description', isActive : true},
    { name: 'Role 2', description: 'Role 2 description', isActive : true},
    { name: 'Role 3', description: 'Role 3 description', isActive : true},
    { name: 'Role 4', description: 'Role 4 description', isActive : true},
    { name: 'Role 5', description: 'Role 5 description', isActive : false}

  ];

  newEntity = { name: '', description: '', isActive: true};

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor() { }

  ngOnInit() {
  }

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addButton() {
    this.entityList.push(this.newEntity);
    this.newEntity = { name: '', description: '', isActive: true};  // Clear the input field
  }

  editButton(entity: any) {
    this.isEditing =
    this.isEditing === entity ? null : entity;
  }

  saveButton(entity: any) {
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: any) {
    this.entityList.splice(this.entityList.indexOf(entity), 1);
  }

}

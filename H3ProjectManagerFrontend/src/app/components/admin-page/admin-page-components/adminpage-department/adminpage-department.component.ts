import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage-department',
  imports: [ CommonModule, FormsModule, ],
  standalone: true,
  templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
  // templateUrl: './adminpage-department.component.html', // This is the standard html file
  // styleUrls: ['./adminpage-department.component.css'], // This is the standard css file 
})
export class AdminpageDepartmentComponent implements OnInit {

  heading: string = "Afdelinger";
  addEntityHeading: string = "Tilføj afdeling";
  labelName: string = "Afdeling navn:";
  addButtonText: string = "Tilføj afdeling";

   // Temp data
  entityList = [
    { name: 'Department 1' },
    { name: 'Department 2' },
    { name: 'Department 3' },
    { name: 'Department 4' },
    { name: 'Department 5' }
  ];

  newEntity = { name: '' };
  
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
    this.newEntity = { name: '' };  // Clear the input field
  }

  editButton(entity: any) {
    this.isEditing =
    this.isEditing === entity ? null : entity;
  }

  saveButton(entity: any) {    
    this.isEditing = null; // Stop editing after saving
  }

  deleteButton(entity: any) {
    console.log(entity)
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage-projectcategory',
  imports: [ CommonModule, FormsModule, ],
  standalone: true,
  templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
  // templateUrl: './adminpage-projectcategory.component.html', // This is the standard html file
  // styleUrls: ['./adminpage-projectcategory.component.css'] // This is the standard css file
})
export class AdminpageProjectcategoryComponent implements OnInit {

  heading: string = "Projekt kategorier";
  addEntityHeading: string = "Tilføj projekt kategori";
  labelName: string = "Projekt kategori navn:";
  addButtonText: string = "Tilføj projekt kategori";

  // Temp data
  entityList = [
    { name: 'Project category 1' },
    { name: 'Project category 2' },
    { name: 'Project category 3' },
    { name: 'Project category 4' },
    { name: 'Project category 5' }
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
    this.entityList.splice(this.entityList.indexOf(entity), 1);
  }
}

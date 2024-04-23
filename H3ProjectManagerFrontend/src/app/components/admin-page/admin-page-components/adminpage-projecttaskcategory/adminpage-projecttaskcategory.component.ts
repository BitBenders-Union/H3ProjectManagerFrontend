import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage-projecttaskcategory',
  imports: [ CommonModule, FormsModule, ],
  standalone: true,
  templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
  // templateUrl: './adminpage-projecttaskcategory.component.html', // This is the standard html file
  // styleUrls: ['./adminpage-projecttaskcategory.component.css'] // This is the standard css file
})
export class AdminpageProjecttaskcategoryComponent implements OnInit {

  heading: string = "Opgave kategorier";
  addEntityHeading: string = "Tilføj opgave kategori";
  labelName: string = "Opgave kategori navn:";
  addButtonText: string = "Tilføj opgave kategori";

  // Temp data
  entityList = [
    { name: 'Task category 1' },
    { name: 'Task category 2' },
    { name: 'Task category 3' },
    { name: 'Task category 4' },
    { name: 'Task category 5' },
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

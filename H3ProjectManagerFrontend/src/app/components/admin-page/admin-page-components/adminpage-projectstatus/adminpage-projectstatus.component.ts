import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage-projectstatus',
  imports: [ CommonModule, FormsModule, ],
  standalone: true,
  templateUrl: './adminpage-projectstatus.component.html',
  styleUrls: ['../admin-page-components.css'],
  // styleUrls: ['./adminpage-location.component.css'] // This is the standard css file
})
export class AdminpageProjectstatusComponent implements OnInit {

  // Temp data
  entityList = [
    { name: 'Projekt status 1' },
    { name: 'Projekt status 2' },
    { name: 'Projekt status 3' },
    { name: 'Projekt status 4' },
    { name: 'Projekt status 5' }
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

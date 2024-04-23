import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage-generic',
  imports: [ CommonModule, FormsModule, ],
  standalone: true,
  templateUrl: './adminpage-generic.component.html',
  styleUrls: ['./adminpage-generic.component.css']
})
export class AdminpageGenericComponent implements OnInit {

  heading: string = "Generic heading";
  addEntityHeading: string = "Generic add entity heading";
  labelName: string = "Generic label name";
  addButtonText: string = "Gereric add button text";


  // Temp data
  entityList = [
    { name: 'Location 1' },
    { name: 'Location 2' },
    { name: 'Location 3' },
    { name: 'Location 4' },
    { name: 'Location 5' }
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage-location',
  imports: [ CommonModule, FormsModule, ],
  standalone: true,
  // templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  // styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
   templateUrl: './adminpage-location.component.html', // This is the standard html file
   styleUrls: ['./adminpage-location.component.css'] // This is the standard css file

})
export class AdminpageLocationComponent implements OnInit {

  heading: string = "Lokationer";
  addEntityHeading: string = "Tilføj lokation";
  labelName: string = "Lokation navn:";
  addButtonText: string = "Tilføj lokation";

  // Temp data
  entityList = [
    { name: 'Location 1', address: 'Address 1'},
    { name: 'Location 2', address: 'Address 2'},
    { name: 'Location 3', address: 'Address 3'},
    { name: 'Location 4', address: 'Address 4'},
    { name: 'Location 5', address: 'Address 5'}
  ];

  newEntity = { name: '', address: ''};

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
    this.newEntity = { name: '', address: '' };  // Clear the input field
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

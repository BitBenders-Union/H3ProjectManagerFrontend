import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage-priority',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: '../adminpage-generic/adminpage-generic.component.html',
  styleUrls: ['../adminpage-generic/adminpage-generic.component.css'],
  //  templateUrl: './adminpage-priority.component.html', // This is the standard html file
  // styleUrls: ['./adminpage-priority.component.css'], // This is the standard css file
})
export class AdminpagePriorityComponent implements OnInit {

  heading: string = "Prioriteter";
  addEntityHeading: string = "Tilføj prioritet";
  labelName: string = "Prioritets navn:";
  addButtonText: string = "Tilføj prioritet";

  // Temp data
  entityList = [
    { name: 'Priority 1' },
    { name: 'Priority 2' },
    { name: 'Priority 3' },
    { name: 'Priority 4' },
    { name: 'Priority 5' },
  ];

  newEntity = { name: '' };

  isCollapsed = false; // Initially visible

  isEditing: any = null; // Track currently edited priority

  constructor() {}

  ngOnInit() {}

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

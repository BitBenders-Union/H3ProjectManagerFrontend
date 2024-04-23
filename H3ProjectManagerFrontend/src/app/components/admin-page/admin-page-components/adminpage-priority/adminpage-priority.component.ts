import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage-priority',
  templateUrl: './adminpage-priority.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['../admin-page-components.css'],
  // styleUrls: ['./adminpage-priority.component.css'], // This is the standard css file
})
export class AdminpagePriorityComponent implements OnInit {

     // Temp data
  priotrityList = [
    { name: 'Priority 1' },
    { name: 'Priority 2' },
    { name: 'Priority 3' },
    { name: 'Priority 4' },
    { name: 'Priority 5' },
  ];

  newPriority = { name: '' };

  isCollapsed = false; // Initially visible

  isEditingPriority: any = null; // Track currently edited priority

  constructor() {}

  ngOnInit() {}

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addPriority() {
    this.priotrityList.push(this.newPriority);
    this.newPriority = { name: '' }; // Clear the input field
    
  }

  editPriority(priority: any) {
    this.isEditingPriority =
      this.isEditingPriority === priority ? null : priority;
  }

  savePriority(priority: any) {
    // Potentially add logic to save changes to the backend or local storage
    // Here, you might update the priority data on your server or perform other actions
    // after editing is complete.
    this.isEditingPriority = null; // Stop editing after saving
  }

  deletePriority(priority: any) {
    const index = this.priotrityList.indexOf(priority);
    this.priotrityList.splice(index, 1);
  }
}

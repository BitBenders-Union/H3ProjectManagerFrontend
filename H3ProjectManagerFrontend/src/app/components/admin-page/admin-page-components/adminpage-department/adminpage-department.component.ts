import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage-department',
  imports: [ CommonModule, FormsModule, ],
  standalone: true,
  templateUrl: './adminpage-department.component.html',
  styleUrls: ['../admin-page-components.css'],
  // styleUrls: ['./adminpage-department.component.css'], // This is the standard css file 
})
export class AdminpageDepartmentComponent implements OnInit {

   // Temp data
  departmentList = [
    { name: 'Department 1' },
    { name: 'Department 2' },
    { name: 'Department 3' },
    { name: 'Department 4' },
    { name: 'Department 5' }
  ];

  newDepartment = { name: '' };
  
  isCollapsed = false; // Initially visible

  isEditingDepartment: any = null; // Track currently edited priority

  constructor() { }

  ngOnInit() {
  }

  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  addDepartment() {
    this.departmentList.push(this.newDepartment);
    this.newDepartment = { name: '' };  // Clear the input field
  }

  editDepartment(department: any) {
    this.isEditingDepartment =
    this.isEditingDepartment === department ? null : department;
  }

  saveDepartment(department: any) {
    // Potentially add logic to save changes to the backend or local storage
    // Here, you might update the department data on your server or perform other actions
    // after editing is complete.
    this.isEditingDepartment = null; // Stop editing after saving
  }

  deleteDepartment(department: any) {
    console.log(department)
  }

}

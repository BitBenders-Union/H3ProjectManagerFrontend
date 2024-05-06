import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserWithDepartment } from '../../models/user';
import { TokenService } from '../../service/token.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department } from '../../models/Department';
import { ApiGenericMethodsService } from '../../service/api-generic-methods.service';


@Component({
  selector: 'app-user-profil',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  departments: Department[] = [];
  user?: UserWithDepartment;
  detailsForm: FormGroup;

  selectedDepartmentIndex: number | null = null; // For holding the selected department index

  constructor(private token: TokenService, private service: ApiGenericMethodsService, private fb: FormBuilder) {
    this.detailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      departmentindex: [null, Validators.required], // Initialize with null
    });
  }

  ngOnInit() {
    this.service.getOne<UserWithDepartment>("Auth/User-Department", this.token.getIdFromToken()).subscribe({
      next: (result) => {
        this.user = result;
        this.user.createdDate = new Date(this.user.createdDate);
        this.setControls();
      },
      error: (error: Error) => {
        console.log(error.message);
      }
    });

    this.service.getAll<Department>("department").subscribe({
      next: (result) => {
        this.departments = result;
      },
      error: (error: Error) => {
        console.log(error.message);
      }
    });
  }

  editProfil() {
    console.log(this.detailsForm.value);
    this.user!.department = this.departments[this.detailsForm.value.departmentindex];
    this.user!.firstName = this.detailsForm.value.firstName;
    this.user!.lastName = this.detailsForm.value.lastName;


    // TODO make the update endpoint on api
    this.service.update<any, UserWithDepartment>("Auth/User-Department", this.user!).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error: Error) => {
        console.log(error.message);
      }
    })

  }

  setControls() {

    // find the index of the department in the departments array that matches the name of the user's department if one exists
    const departmentIndex = this.departments.findIndex((department) => department.name === this.user?.department.name);

    this.detailsForm.patchValue({
      firstName: this.user?.firstName,
      lastName: this.user?.lastName,
      // If the departmentIndex is -1, set it to null, otherwise set it to the index of the department
      departmentindex: departmentIndex === -1 ? null : departmentIndex 
    });
    this.selectedDepartmentIndex = departmentIndex === -1 ? null : departmentIndex; 
  }
}

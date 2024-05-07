import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserWithDepartment } from '../../models/user';
import { TokenService } from '../../service/token.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department } from '../../models/Department';
import { ApiGenericMethodsService } from '../../service/api-generic-methods.service';
import { forkJoin, map } from 'rxjs';


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
export class UserProfilComponent implements OnInit, AfterViewInit {
  departments: Department[] = [];
  user?: UserWithDepartment;
  detailsForm: FormGroup;

  selectedDepartmentIndex?: number | null = null; // For holding the selected department index

  constructor(private token: TokenService, private service: ApiGenericMethodsService, private fb: FormBuilder) {
    this.detailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      departmentindex: [null, Validators.required], // Initialize with null
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    forkJoin([
      this.service.getOne<UserWithDepartment>("UserDetails", this.token.getIdFromToken()),
      this.service.getAll<Department>("department")
    ]).pipe(
      map(([user, departments]) => ({ user, departments })) // Map the results into a single object
    ).subscribe({
      next: ({ user, departments }) => {
        this.user = user;
        this.user.createdDate = new Date(this.user.createdDate);
        this.departments = departments;
      },
      error: (error: Error) => {
        console.log(error.message);
      },
      complete: () => {
        this.setControls(); // Call setControls after data is available
      }
    });
  }
  
  
  editProfil() {

    this.user!.department = this.departments[this.detailsForm.value.departmentindex];
    this.user!.firstName = this.detailsForm.value.firstName;
    this.user!.lastName = this.detailsForm.value.lastName;

    this.service.update<any, UserWithDepartment>("UserDetails", this.user!).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error: Error) => {
        console.log(error.message);
      }
    })

  }

  setControls() {
    this.detailsForm.controls['firstName'].setValue(this.user?.firstName);
    this.detailsForm.controls['lastName'].setValue(this.user?.lastName);
    if(this.user?.department){
      this.selectedDepartmentIndex = this.departments.findIndex(d => d.id === this.user?.department.id);
      this.detailsForm.controls['departmentindex'].setValue(this.selectedDepartmentIndex);
    }
    
  }
}

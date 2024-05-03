import { Component, OnInit, isStandalone } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminpageDepartmentComponent } from './admin-page-components/adminpage-department/adminpage-department.component';
import { AdminpagePriorityComponent } from './admin-page-components/adminpage-priority/adminpage-priority.component';
import { AdminpageLocationComponent } from './admin-page-components/adminpage-location/adminpage-location.component';
import { AdminpageProjectstatusComponent } from './admin-page-components/adminpage-projectstatus/adminpage-projectstatus.component';
import { AdminpageProjecttaskstatusComponent } from './admin-page-components/adminpage-projecttaskstatus/adminpage-projecttaskstatus.component';
import { AdminpageGenericComponent } from './admin-page-components/adminpage-generic/adminpage-generic.component';
import { AdminpageProjectcategoryComponent } from './admin-page-components/adminpage-projectcategory/adminpage-projectcategory.component';
import { AdminpageProjecttaskcategoryComponent } from './admin-page-components/adminpage-projecttaskcategory/adminpage-projecttaskcategory.component';
import { AdminpageRoleComponent } from './admin-page-components/adminpage-role/adminpage-role.component';

@Component({
  selector: 'app-admin-page',
  imports: [ RouterModule,
    AdminpageDepartmentComponent, AdminpagePriorityComponent, AdminpageLocationComponent,
    AdminpageProjectstatusComponent, AdminpageProjecttaskstatusComponent, AdminpageGenericComponent,
    AdminpageProjectcategoryComponent, AdminpageProjecttaskcategoryComponent, AdminpageRoleComponent
  ],
  standalone: true,
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  isCollapsed = false; // Initially visible


  // Function to toggle visibility of the form
  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  // Function to scroll to the section with the given id
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

}

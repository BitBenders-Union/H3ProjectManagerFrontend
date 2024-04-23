import { Component, OnInit, isStandalone } from '@angular/core';
import { AdminpageDepartmentComponent } from './admin-page-components/adminpage-department/adminpage-department.component';
import { AdminpagePriorityComponent } from './admin-page-components/adminpage-priority/adminpage-priority.component';
import { AdminpageLocationComponent } from './admin-page-components/adminpage-location/adminpage-location.component';
import { AdminpageProjectstatusComponent } from './admin-page-components/adminpage-projectstatus/adminpage-projectstatus.component';
import { AdminpageProjecttaskstatusComponent } from './admin-page-components/adminpage-projecttaskstatus/adminpage-projecttaskstatus.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  imports: [ RouterModule,
    AdminpageDepartmentComponent, AdminpagePriorityComponent, AdminpageLocationComponent,
    AdminpageProjectstatusComponent, AdminpageProjecttaskstatusComponent
  ],
  standalone: true,
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  
  constructor() {}

  ngOnInit() {}

  isCollapsed = false; // Initially visible


  toggleVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

}

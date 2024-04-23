import { Component, OnInit, isStandalone } from '@angular/core';
import { AdminpageDepartmentComponent } from './admin-page-components/adminpage-department/adminpage-department.component';
import { AdminpagePriorityComponent } from './admin-page-components/adminpage-priority/adminpage-priority.component';

@Component({
  selector: 'app-admin-page',
  imports: [AdminpageDepartmentComponent, AdminpagePriorityComponent,],
  standalone: true,
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

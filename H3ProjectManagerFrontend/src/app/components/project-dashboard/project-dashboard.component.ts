import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboard } from '../../models/Project';

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent {
  
  projectList : ProjectDashboard[] = [
    {
      id: 1,
      name: 'Project 1',
      category: 'Category 1',
      owner: 'Owner 1'
    },
    {
      id: 2,
      name: 'Project 2',
      category: 'Category 2',
      owner: "2"
    },
    {
      id: 3,
      name: 'Project 3',
      category: 'Category 3',
      owner: "somebody"
    },
    {
      id: 4,
      name: 'Project 4',
      category: 'Category 4',
      owner: "somebody else"
    },
    {
      id: 5,
      name: 'Project 5',
      category: 'Category 5',
      owner: "somebody else"
    },
    {
      id: 6,
      name: 'Project 6',
      category: 'Category 6',
      owner: "somebody else"

    },
    {
      id: 7,
      name: 'Project 7',
      category: 'Category 7',
      owner: "somebody else"
    },
    {
      id: 8,
      name: 'Project 8',
      category: 'Category 8',
      owner: "somebody else"
    },
    {
      id: 9,
      name: 'Project 9',
      category: 'Category 9',
      owner: "somebody else"
    },
    {
      id: 10,
      name: 'Project 10',
      category: 'Category 10',
      owner: "somebody else"
    },
    {
      id: 11,
      name: 'Project 11',
      category: 'Category 11',
      owner: "somebody else"
    },
    {
      id: 12,
      name: 'Project 12',
      category: 'Category 12',
      owner: "somebody else"
    },
    {
      id: 13,
      name: 'Project 13',
      category: 'Category 13',
      owner: "somebody else"
    },
    {
      id: 14,
      name: 'Project 14',
      category: 'Category 14',
      owner: "somebody else"
    }

  ]

  navigateToProjectDetails(index: number){
    console.log(index);
  }

  createNewProject(){

  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboard } from '../../models/Project';
import { Router, RouterLink } from '@angular/router';
import { ApiGenericMethodsService } from '../../service/api-generic-methods.service';
import { TokenService } from '../../service/token.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent implements OnInit  {
  
  projectList : ProjectDashboard[] = []
  filteredData: ProjectDashboard[] = [];


  searchValue = "";
  private searchSubject = new Subject<string>();
  

  // make a service that gets all the projects for the user
  constructor(private apiService: ApiGenericMethodsService, private route: Router, private token: TokenService) {


    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.Search(searchTerm);
    });

    
  }


  ngOnInit(){
    // call the service to get all the projects

    this.apiService.getAll<ProjectDashboard>("Project/GetForUser", this.token.getIdFromToken()).subscribe({
      next: (data: ProjectDashboard[]) => {
        console.log(data);
        this.projectList = data;
        this.filteredData = this.projectList;
      },
      error: (error) => {
        console.error('There was an error in project-dashboard!', error.message);
      }
    })


  }




  navigateToProjectDetails(index: number){
    this.route.navigate(['/project-details', this.projectList[index].id]);
  }


  deleteProject(index: number){
    this.apiService.delete("Project", this.projectList[index].id).subscribe({
      next: (data) => {
        console.log(data);
        this.projectList.splice(index, 1);
      },
      error: (error) => {
        console.error('There was an error in project-dashboard!', error.message);
      }
    })
  }


  Search(term: string) {
    
    // if term is empty string show all projects
    if(term === ""){
      this.filteredData = this.projectList;
    }
    else{
      this.filteredData = this.projectList.filter((project) => {
        return project.name.toLowerCase().includes(term.toLowerCase());
      });
    }


  }
  
  setValue(term: string) {
    this.searchSubject.next(term);
  }



}

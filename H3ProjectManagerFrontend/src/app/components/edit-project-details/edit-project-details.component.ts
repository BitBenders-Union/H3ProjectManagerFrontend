import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";


@Component({
  selector: 'app-edit-project-details',
  standalone: true,
  imports: [NgMultiSelectDropDownModule],
  templateUrl: './edit-project-details.component.html',
  styleUrl: './edit-project-details.component.css'
})
export class EditProjectDetailsComponent implements OnInit{

  
  constructor(private routeActive: ActivatedRoute) {}

  ngOnInit(){
      let id = this.routeActive.snapshot.paramMap.get('id');
  }

  autoFill(){

  } 

  
}

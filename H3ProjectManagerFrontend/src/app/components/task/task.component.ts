import { Component, OnInit, Input } from '@angular/core';
import { ProjectTask } from '../../models/ProjectTask';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [

  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  @Input({required: true}) task!: ProjectTask;

  taskName?: string = "Temp Task Name";
  projectName?: string = "Temp Project Name";
  taskPriority?: string = "Temp Priority";
  taskStatus?: string = "Temp Status";
  taskCategory?: string = "Temp Category";


  constructor() { }

  ngOnInit(){
  }

  showTaskDetails(){
    //Do stuff
  }
}

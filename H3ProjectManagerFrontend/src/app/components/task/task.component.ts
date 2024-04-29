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

  constructor() { }

  ngOnInit(){
  }

}

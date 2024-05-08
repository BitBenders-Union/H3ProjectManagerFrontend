import { Component, OnInit, Input } from '@angular/core';
import { ProjectTask, ProjectTaskDetails } from '../../models/ProjectTask';
import { DataTransferServiceService } from '../../service/DataTransferService.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [    
    RouterLink

  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  @Input({required: true}) task!: ProjectTaskDetails;

  constructor(private sendDataService : DataTransferServiceService, private router : Router) { }

  ngOnInit(){
  }

  showTaskDetails(item : any){    
    this.sendDataService.SendTask(item);
    this.router.navigate(['/task-details']);
  }
}

import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [

  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent {

  

  taskForm: FormGroup = new FormGroup({

  });


}

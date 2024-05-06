import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { TokenService } from '../../service/token.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department } from '../../models/Department';


@Component({
  selector: 'app-user-profil',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  departments : Department[] = [];
  user: User = this.token.getUserFromToken()!;

  detailsForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    creationDate: new FormControl('', Validators.required),
    departmentsForm: new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      }
    )
    }
  );



  constructor(private token: TokenService) { }

  ngOnInit() {

    
  }

  editProfil() {

  }

}

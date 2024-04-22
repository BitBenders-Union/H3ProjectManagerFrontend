import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-profil',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  afdelinger : any[] = [];

  constructor() { }

  ngOnInit() {
  }

  editProfil() : void {
    console.log('editProfil');
  }

}

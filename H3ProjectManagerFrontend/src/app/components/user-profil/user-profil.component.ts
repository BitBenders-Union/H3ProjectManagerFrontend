import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  editProfil() : void {
    console.log('editProfil');
  }

}

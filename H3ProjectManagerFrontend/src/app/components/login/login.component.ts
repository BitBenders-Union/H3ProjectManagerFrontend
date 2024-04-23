import { Component } from '@angular/core';
import { Login } from '../../models/Login';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginModel: Login = {
    username: "",
    password: ""
  }

  onSubmit(): void {
    console.log(this.loginModel.username)
    console.log(this.loginModel.password)
  }
}

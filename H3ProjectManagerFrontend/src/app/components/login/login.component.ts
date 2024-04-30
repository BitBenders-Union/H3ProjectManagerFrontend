import { Component } from '@angular/core';
import { Login } from '../../models/Login';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../service/api-service.service';
import { TokenModel } from '../../models/Token';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(
    private service: ApiServiceService<TokenModel,Login>,
    private tokenService: TokenService,
    private route: Router
  ) {    
  }

  endpoint: string = "Auth/Login"
  token?: TokenModel

  loginModel: Login = {
    username: "",
    password: ""
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  onSubmit(): void {
    this.loginModel = this.loginForm.value
    this.service.create(this.endpoint, this.loginModel).subscribe({
      next: data => {
        this.token = data
        this.tokenService.storeAccessToken(this.token.accessToken);
        this.tokenService.storeRefreshToken(this.token.refreshToken);
        console.log(this.token)
      },
      error: error => {
        console.error(error)
      },
      complete : () =>{
        this.route.navigate(['/project-dashboard'])
      }
    })
  }
}

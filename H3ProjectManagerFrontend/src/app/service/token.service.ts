import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private userPayLoad: any;
  constructor(private router: Router) {
    this.userPayLoad = this.decodeToken();
   }

  storeAccessToken(accessToken: string)
  {
    localStorage.setItem("AccessToken", accessToken);
  }

  storeRefreshToken(refreshToken: string)
  {
    localStorage.setItem("RefreshToken", refreshToken);
  }

  static getToken(){
    localStorage.getItem("AccessToken");
  }

  decodeToken(){
    const token = TokenService.getToken()!;
    const jwtHelper = new JwtHelperService()

    return jwtHelper.decodeToken(token);
  }

  signOut(){
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    this.router.navigate(["/"])
  }

  getIdFromToken(){
    if(this.userPayLoad)
      return this.userPayLoad.nameid;
  }

  getUsernameFromToken(){
    if(this.userPayLoad)
      return this.userPayLoad.name;
  }

  getFirstNameFromToken(){
    if(this.userPayLoad)
      return this.userPayLoad.firstname;
  }

  getLastNameFromToken(){
    if(this.userPayLoad)
      return this.userPayLoad.lastname;
  }
  
}

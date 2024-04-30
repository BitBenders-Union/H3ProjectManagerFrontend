import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { TokenModel } from '../models/Token';
import { Observable, Subject, catchError, of, retry, switchMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  url: string = environment.apiUrl;
  private userPayLoad: any;
  constructor(private router: Router, private http: HttpClient) {
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

  getAccessToken(): string | null {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      return token;
    } else {
      return null; // Or handle the missing token case (e.g., redirect to login)
    }
  }
  getRefreshToken(){
    return localStorage.getItem("RefreshToken");
  }

  decodeToken(){
    const token = this.getAccessToken()!;
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

  renewToken(): Observable<TokenModel>{
    const token = new TokenModel();
    token.accessToken = this.getAccessToken()!;
    token.refreshToken = this.getRefreshToken()!;

    if(!token.accessToken || !token.refreshToken)
      this.signOut();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<TokenModel>(this.url + "Auth/RefreshToken", token, {headers}).pipe(
      (retry(2)),
      catchError((err: any) => {
        return throwError(() => {
          this.signOut()
          this.router.navigate(["/"])
        });
      })
    );
  }
}

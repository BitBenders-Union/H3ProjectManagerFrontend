import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  storeAccessToken(accessToken: string)
  {
    localStorage.setItem("AccessToken", accessToken);
  }

  storeRefreshToken(refreshToken: string)
  {
    localStorage.setItem("RefreshToken", refreshToken);
  }

  
}

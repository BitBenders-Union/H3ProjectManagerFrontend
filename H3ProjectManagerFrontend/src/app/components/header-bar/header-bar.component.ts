import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouterOutlet, RouterLink, RouterModule, Router } from '@angular/router';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    CommonModule

  ],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.css'
})
export class HeaderBarComponent {


  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit(): void {
    if(this.isLoggedIn())
      {
        this.getUsernameFromToken();
      }
  }

  isLoggedIn(): boolean {
    return this.tokenService.getAccessToken() !== null;
  }

  getUsernameFromToken(): string | null {
    return this.tokenService.getUsernameFromToken();
  }

  signOut(): void {
    this.tokenService.signOut();
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouterOutlet, RouterLink, RouterModule, Router } from '@angular/router';

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


  constructor(private router: Router) {}



}

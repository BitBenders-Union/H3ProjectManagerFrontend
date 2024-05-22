import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-frontpage',
  standalone: true,
  imports: [
    NgOptimizedImage, 
  ],
  templateUrl: './frontpage.component.html',
  styleUrl: './frontpage.component.css'
})
export class FrontpageComponent {

}

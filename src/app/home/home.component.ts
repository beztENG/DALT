import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    {
      imgSrc: 'assets/image1.jpg',
      imgAlt: 'image 1',
    },
    {
      imgSrc: 'assets/image2.jpg',
      imgAlt: 'image 2',
    },
    {
      imgSrc: 'assets/image3.jpg',
      imgAlt: 'image 3',
    },
  ]

}

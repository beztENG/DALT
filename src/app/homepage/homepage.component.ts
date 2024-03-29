import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
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

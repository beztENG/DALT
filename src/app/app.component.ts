import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'english-course-website';

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

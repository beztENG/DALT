import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent {
  images: string[] = [
    'assets/image1.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg'
  ];
  currentImageIndex: number = 0;

  constructor(private elementRef: ElementRef) { }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
    else if (this.currentImageIndex == 0) {
      this.currentImageIndex = 2;
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    }
    else if (this.currentImageIndex == this.images.length - 1) {
      this.currentImageIndex = 0;
    }
  }
  goToImage(index: number) {
    this.currentImageIndex = index;
  }

}

import { Component, Input } from '@angular/core';

export interface Slide {
  imgSrc: string;
  imgAlt: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() images: Slide[] = [];

  selectedIndex = 0;

  showPrev(i: number) {
    if (this.selectedIndex > 0) {
      this.selectedIndex = i - 1;
    }
  }

  showNext(i: number) {
    if (this.selectedIndex < this.images?.length - 1) {
      this.selectedIndex = i + 1;
    }
  }
}

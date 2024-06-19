import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements AfterViewInit {
  @ViewChild('course1') course1!: ElementRef;
  @ViewChild('course2') course2!: ElementRef;
  @ViewChild('course3') course3!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.3 // 30% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(this.course1.nativeElement);
    observer.observe(this.course2.nativeElement);
    observer.observe(this.course3.nativeElement);
  }
}

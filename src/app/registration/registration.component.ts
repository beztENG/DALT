import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  countdown: any = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  endDate: Date = new Date('2024-08-24T00:00:00'); // Đặt thời gian kết thúc ở đây

  constructor() { }

  ngOnInit() {
    this.updateCountdown();
    setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const now = new Date();
    const difference = this.endDate.getTime() - now.getTime();

    this.countdown.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    this.countdown.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.countdown.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    this.countdown.seconds = Math.floor((difference % (1000 * 60)) / 1000);
  }

}
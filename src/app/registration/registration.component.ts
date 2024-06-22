import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  phoneNumber: string = '';
  city: string = '';
  district: string = '';
  ward: string = '';

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
  sendRegistrationEmail(event: Event): void {
    event.preventDefault();

    const templateParams = {
      to_name: this.fullName,
      to_email: this.email,
      phone_number: this.phoneNumber,
      city: this.city,
      district: this.district,
      ward: this.ward
    };

    emailjs.send('service_j4ici98', 'template_cup2g2q', templateParams, 'J0OaKjwbSr61aY8yd')
      .then((response: EmailJSResponseStatus) => {
        console.log('Email sent successfully', response);
        alert('Email sent successfully!'); // Display success message
        this.resetForm(); // Optional: Reset form fields after successful submission
      }, (error) => {
        console.error('Failed to send email', error);
        alert('Failed to send email. Please try again.'); // Display error message
      });
  }

  resetForm(): void {
    this.fullName = '';
    this.email = '';
    this.phoneNumber = '';
    this.city = '';
    this.district = '';
    this.ward = '';
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
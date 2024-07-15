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

  emailError: string = '';
  phoneError: string = '';

  countdown: any = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  endDate: Date = new Date('2024-08-24T00:00:00'); // Đặt thời gian kết thúc ở đây
  showNotification: boolean = false;
  notificationMessage: string = '';
  constructor() { }

  ngOnInit() {
    this.updateCountdown();
    setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  sendRegistrationEmail(event: Event): void {
    event.preventDefault();

    // Reset errors
    this.emailError = '';
    this.phoneError = '';

    // Validate email and phone number
    if (!this.validateEmail(this.email)) {
      this.emailError = 'Email không hợp lệ.';
    }
    if (!this.validatePhoneNumber(this.phoneNumber)) {
      this.phoneError = 'Số điện thoại không hợp lệ.';
    }

    // If there are validation errors, do not proceed
    if (this.emailError || this.phoneError) {
      return;
    }

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
        this.showNotificationMessage(`Email sent successfully`)
        this.resetForm(); // Optional: Reset form fields after successful submission
      }, (error) => {
        console.error('Failed to send email', error);
        this.showNotificationMessage(`Failed to send email. Please try again.`); // Display error message
      });
  }
  showNotificationMessage(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  resetForm(): void {
    this.fullName = '';
    this.email = '';
    this.phoneNumber = '';
    this.city = '';
    this.district = '';
    this.ward = '';
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    const re = /^(?:\+?\d{1,3})?[ -]?\d{10}$/;
    return re.test(String(phoneNumber));
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

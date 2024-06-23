import { Component, OnInit } from '@angular/core';
import { ContactBookService } from 'src/app/services/contact-book.service';
import { Student } from 'src/app/shared/models/student';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { AcademicManagementService } from 'src/app/services/academic-management.service';
import emailjs from '@emailjs/browser'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentInfo: Student | undefined;
  studentData: Data = {
    studentId: '',
    studentName: '',
    classes: []
  };
  listId: string[] = [];
  classData: ClassCourse = {
    courseId: '',
    classId: ''
  };
  newlist: ClassCourse[] = [];
  showNotification: boolean = false;
  notificationMessage: string = '';

  constructor(
    private contactBookService: ContactBookService,
    private authService: AuthenticationService,
    private router: Router,
    private classService: ClassService,
    private studenService: AcademicManagementService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const studentEmail = localStorage.getItem('email');
    if (studentEmail) {
      this.contactBookService.getContactById(studentEmail).subscribe(
        (data: Student) => {
          this.studentInfo = data;
          this.loadStudentClasses(data.studentId);
        },
        (error) => {
          console.error('Failed to retrieve student info:', error);
        }
      );
    }
  }

  loadStudentClasses(studentId: string): void {
    this.studenService.getStudentByStudentId(studentId).subscribe((data) => {
      this.studentData.studentName = data.studentName;
      this.studentData.studentId = data.studentId;
      this.studentData.classes = data.classes;
      this.listId = data.classes;
      this.listId.forEach((idclass) => {
        this.getClass(idclass);
      });
    });
  }

  getClass(idclass: string) {
    this.classService.getClassById(idclass).subscribe((classcourse) => {
      this.classData.classId = classcourse.classId;
      this.classData.courseId = classcourse.courseId;
      this.newlist.push({ ...this.classData });
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  sendEmail(): void {
    if (this.studentInfo) {
      const templateParams = {
        to_name: this.studentInfo.studentName,
        to_email: this.studentInfo.email,
        student_name: this.studentInfo.studentName,
        phone_number: this.studentInfo.phoneNumber,
        registration_date: this.studentInfo.registrationDate,
        class_list: this.newlist.map(c => `Course ID: ${c.courseId}, Class ID: ${c.classId}`).join('\n')
      };

      emailjs.send('service_j4ici98', 'template_pqhbpdx', templateParams, 'J0OaKjwbSr61aY8yd')
        .then((response) => {
          console.log('Email sent successfully!', response.status, response.text);
          this.showNotificationMessage(`Email sent successfully to ${this.studentInfo?.email}`);
        }, (error) => {
          console.error('Failed to send email:', error);
          this.showNotificationMessage('Failed to send email. Please try again.');
        });
    }
  }
  showNotificationMessage(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
  
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showChangePasswordForm = false;

  changePassword(): void {
    if(this.newPassword !== this.confirmPassword) {
      this.showNotificationMessage('Mật khẩu mới không khớp nhau. Vui lòng thử lại.');
      return;
    }

    if(this.oldPassword !== this.studentInfo?.password) {
      this.showNotificationMessage('Mật khẩu cũ không đúng. Vui lòng thử lại.');
      return;
    }

    this.authService.changePassword(this.studentInfo?.email || '', this.newPassword).subscribe(
      (res) => {
        console.log('Password changed successfully:', res);
        this.showNotificationMessage('Đổi mật khẩu thành công');
      },
      (error) => {
        console.error('Failed to change password:', error);
        this.showNotificationMessage('Đổi mật khẩu thất bại. Vui lòng thử lại.');
      }
    );
  }

  openChangePasswordForm(): void {
    this.showChangePasswordForm = true;
  }

  cancelChangePassword(): void {
    this.showChangePasswordForm = false;
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }



}
export interface Data {
  studentId: string;
  studentName: string;
  classes: string[];
}

export interface ClassCourse {
  courseId: string;
  classId: string;
}

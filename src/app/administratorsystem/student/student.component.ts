import { Component } from '@angular/core';
import { ContactBookService } from 'src/app/services/contact-book.service';
import { Student } from 'src/app/shared/models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  studentInfo: Student | undefined;

  constructor(private contactBookService: ContactBookService) { }

  ngOnInit(): void {
    const studentEmail = localStorage.getItem('email');
    if (studentEmail) {
      this.contactBookService.getContactById(studentEmail).subscribe(
        (data: Student) => {
          this.studentInfo = data;
        },
        (error) => {
          console.error('Failed to retrieve student info:', error);
        }
      );
    }
  }
}
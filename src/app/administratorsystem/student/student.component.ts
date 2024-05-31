import { Component, OnInit } from '@angular/core';
import { ContactBookService } from 'src/app/services/contact-book.service';
import { Student } from 'src/app/shared/models/student';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentInfo: Student | undefined;

  constructor(private contactBookService: ContactBookService,     
    private authService: AuthenticationService,
    private router: Router) { } 

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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}

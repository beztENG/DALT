import { Component, OnInit } from '@angular/core';
import { ContactBookService } from 'src/app/services/contact-book.service';
import { Student } from 'src/app/shared/models/student';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { AcademicManagementService } from 'src/app/services/academic-management.service';
// import { Class } from '../administratorsystem/shared/interface/class/class';

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

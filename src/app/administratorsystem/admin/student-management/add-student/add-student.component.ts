import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/administratorsystem/shared/interface/academicManagement/student';
import { AcademicManagementService } from 'src/app/services/academic-management.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  students: Student[] = [];
  newStudent: Student = {
    studentId: '',
    studentName: '',
    email: '',
    password: '',
    phoneNumber: '',
    registrationDate: new Date(),
    midtermGrade: '',
    finalGrade: ''
  };

  constructor(private academicService: AcademicManagementService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.academicService.getStudentsByRegistrationDate().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  addStudent(): void {
    this.academicService.addStudent(this.newStudent).subscribe(
      (addedStudent) => {
        this.students.push(addedStudent);
        console.log('Student added:', addedStudent);
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }

  cancelAdd(): void {
    console.log('Adding student cancelled');
  }
}

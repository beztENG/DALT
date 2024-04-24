import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/administratorsystem/shared/interface/academicManagement/student';
import { AcademicManagementService } from 'src/app/services/academic-management.service';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  students: Student[] = [];
  searchKeyword: string = '';
  selectedStudent: Student | null = null;

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

  search(): void {
    if (this.searchKeyword.trim() !== '') {
      this.academicService.searchStudents(this.searchKeyword).subscribe(
        (data) => {
          this.students = data;
        },
        (error) => {
          console.error('Error searching students:', error);
        }
      );
    } else {
      this.loadStudents();
    }
  }

  deleteStudent(studentId: string) {
    this.academicService.deleteStudent(studentId).subscribe(
      (response) => {
        console.log('Student deleted:', response.message);
        this.students = this.students.filter(student => student.studentId !== studentId);
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }

  openEditStudentForm(student: Student) {
    this.selectedStudent = student;
  }

  updateStudent(updatedStudent: Student) {
    if (!this.selectedStudent) {
      return; // No selected student to update
    }

    this.academicService.updateStudent(this.selectedStudent.studentId, updatedStudent).subscribe(
      (updatedStudent) => {
        const index = this.students.findIndex(s => s.studentId === updatedStudent.studentId);
        if (index !== -1) {
          this.students[index] = updatedStudent;
        }
        this.selectedStudent = null; // Clear selected student after update
        console.log('Student updated:', updatedStudent);
      },
      (error) => {
        console.error('Error updating student:', error);
      }
    );
  }

  cancelEdit() {
    this.selectedStudent = null;
  }
}

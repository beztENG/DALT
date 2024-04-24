import { Component, OnInit, ViewChild } from '@angular/core';
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
  showAddStudentForm = false;
  showEditStudentForm = false;
  selectedStudent: Student | null = null;
  editMode: boolean = false;

  @ViewChild('addStudentForm') addStudentForm: any; // Template reference variable for add form
  @ViewChild('editStudentForm') editStudentForm: any; // Template reference variable for edit form

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

  openAddStudentForm() {
    this.editMode = true;
    this.selectedStudent = null; // Clear for new student
    this.showAddStudentForm = true;
  }

  closeAddStudentForm() {
    this.showAddStudentForm = false;
  }

  openEditStudentForm(student: Student) {
    this.editMode = true;
    this.selectedStudent = student; // Set for editing
    this.showEditStudentForm = true;
  }

  closeEditStudentForm() {
    this.showEditStudentForm = false;
  }

  addStudent(newStudent: Student) {
    this.academicService.addStudent(newStudent).subscribe(
      (newStudent) => {
        newStudent.registrationDate = new Date(); // Set registration date to current date
        newStudent.midtermGrade="0";
        newStudent.finalGrade ="0";
        this.students.push(newStudent);
        this.closeAddStudentForm();
        console.log('Student added:', newStudent);
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }

  deleteStudent(studentId: string) {
    this.academicService.deleteStudent(studentId).subscribe(
      (response) => {
        console.log('Student deleted:', response.message);
        this.students = this.students.filter(student => student.studentId !== studentId); // Remove from displayed list
        // Handle successful deletion (e.g., display success message)
      },
      (error) => {
        console.error('Error deleting student:', error);
        // Handle error (e.g., display error message to user)
      }
    );
  }

  updateStudent(updatedStudent: Student) {
    this.academicService.updateStudent(updatedStudent.studentId, updatedStudent).subscribe(
      (updatedStudent) => {
        const studentIndex = this.students.findIndex(student => student.studentId === updatedStudent.studentId);
        if (studentIndex !== -1) {
          this.students[studentIndex] = updatedStudent; // Update student in displayed list
        }
        this.closeEditStudentForm();
        console.log('Student updated:', updatedStudent);
      },
      (error) => {
        console.error('Error updating student:', error);
        // Handle error (e.g., display error message to user)
      }
    );
  }
}
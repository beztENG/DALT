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

  @ViewChild('addStudentForm') addStudentForm: any; // Template reference variable for add form
  @ViewChild('editStudentForm') editStudentForm: any; // Template reference variable for edit form

  constructor(private academicService: AcademicManagementService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  // Open and close add/edit student forms
  openAddStudentForm() {
    this.editMode = true;
    this.newStudent = {
      studentId: '',
      studentName: '',
      email: '',
      password: '',
      phoneNumber: '',
      registrationDate: new Date(),
      midtermGrade: '',
      finalGrade: ''
    }; // Clear for new student
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

  //Them
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

  //Xoa
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
  //Sua
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
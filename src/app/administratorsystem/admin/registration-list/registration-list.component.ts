import { Component, OnInit } from '@angular/core';
import { AcademicManagementService } from 'src/app/services/academic-management.service';
import { Student } from 'src/app/interface/academicManagement/student';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {
  students: Student[] = [];
  searchKeyword: string = '';

  constructor(private academicService: AcademicManagementService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.academicService.getStudentsByRegistrationDate().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.log('Error fetching students:', error);
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
          console.log('Error searching students:', error);
        }
      );
    } else {
      this.loadStudents(); 
    }
  }
}

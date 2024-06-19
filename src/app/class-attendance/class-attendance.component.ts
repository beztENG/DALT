import { Component } from '@angular/core';
import { Class } from 'src/app/administratorsystem/shared/interface/class/class';
import { ClassService } from 'src/app/services/class.service';
import { Student } from '../administratorsystem/shared/interface/academicManagement/student';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { AcademicManagementService } from '../services/academic-management.service';

@Component({
  selector: 'app-class-attendance',
  templateUrl: './class-attendance.component.html',
  styleUrls: ['./class-attendance.component.css']
})
export class ClassAttendanceComponent {
  data: Class = { courseId: '', classId: '', listStudent: [] };
  listId: string[] = [];
  listStudent : Student[] = [];  
  newlist : Student[] = [];
  listAttendance: Attendance[] = [];
  newattendance: Attendance = {
    studentId: '',
    studentName: '',
    studentAttendance: true
  };
  index: number = 0;
  constructor(private classService: ClassService, private route: ActivatedRoute, private studentServie: AcademicManagementService) {}
  courseId = this.route.snapshot.params.courseId;
  classId = this.route.snapshot.params.classId;

  // student: Student = {
  //   studentId: '',
  //   studentName: '',
  //   email: '',
  //   password: '',
  //   phoneNumber: '',
  //   registrationDate: new Date(),
  //   midtermGrade: '',
  //   finalGrade: ''
  // };
  
  ngOnInit() {
    this.classService.getOneClass(this.courseId, this.classId).subscribe((data) => {
      this.data = data;
      this.listId = data.listStudent;
      this.getStudent(this.listId);
      // this.newlist = this.listStudent.filter((item, index) => this.listStudent.indexOf(item) === index);
      this.listAttendance.sort((a, b) => {
        if (a.studentName < b.studentName) return -1;
        if (a.studentName > b.studentName) return 1;
        return 0;
      });      
    })
  }

  getStudent(listId: string[]) {
    listId.forEach(element => {
      this.studentServie.getStudentById(element).subscribe((student) => {
        this.newattendance.studentId = student.studentId;
        this.newattendance.studentName = student.studentName;
        this.listAttendance.push(this.newattendance);
        this.newattendance = {
          studentId: '',
          studentName: '',
          studentAttendance: true
        };
      })       
    });       
  } 

  saveAttendance(listAttendance: Attendance[]) {
    const time = new Date();
    const worksheet = XLSX.utils.json_to_sheet(listAttendance);

    // Tạo workbook và thêm worksheet vào
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Xuất workbook thành file Excel
    XLSX.writeFile(workbook, `Attendance_${this.data.courseId.toString()}_${this.data.classId.toString()}_${time.toDateString()}.xlsx`);
  }


}

export interface Attendance {
  studentId: string;
  studentName: string;
  studentAttendance: boolean;
}

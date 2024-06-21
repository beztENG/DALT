import { Component } from '@angular/core';
import { ClassService } from '../services/class.service';
import { AcademicManagementService } from '../services/academic-management.service';
import { ActivatedRoute } from '@angular/router';
import { Class } from '../administratorsystem/shared/interface/class/class';

@Component({
  selector: 'app-student-book',
  templateUrl: './student-book.component.html',
  styleUrls: ['./student-book.component.css']
})
export class StudentBookComponent {
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
  newlist : ClassCourse[] = [];

  index: number = 0;
  constructor(private classService: ClassService, private studenService: AcademicManagementService, private route: ActivatedRoute) {}
  studentId = this.route.snapshot.params.studentId;

  ngOnInit() {
    this.studenService.getStudentByStudentId(this.studentId).subscribe((data) => {    
      this.studentData.studentName = data.studentName;
      this.studentData.studentId = data.studentId;
      this.studentData.classes = data.classes;        
      this.listId = data.classes;
      this.listId.forEach((idclass) => {
        this.getClass(idclass);
      });             
    })
  }

  getClass(idclass: string) {
    this.classService.getClassById(idclass).subscribe((classcourse) => {
      this.classData.classId = classcourse.classId;
      this.classData.courseId = classcourse.courseId;
      this.newlist.push(this.classData);
    });
    this.classData = {
      courseId: '',
      classId: ''
    };
  }
}

export interface Data {
  studentId: string;
  studentName: string;
  classes: string[];
}

export interface ClassCourse{
  courseId: string;
  classId: string;
}

import { Component, ViewChild } from '@angular/core';
import { Course } from 'backend/src/models/courses.model';
import { CourseService } from 'src/app/services/course.service';
import { Class } from '../../shared/interface/class/class';
import { ClassService } from 'src/app/services/class.service'

@Component({
  selector: 'app-course-mana',
  templateUrl: './course-mana.component.html',
  styleUrls: ['./course-mana.component.css']
})
export class CourseManaComponent {
  courses: Course[] = [];
  Classes: Class[] = [];
  showAddCourseModal = false;
  newCourse: Course = {
    courseId: '',
    name: '',
    imgUrl: '',
    description: '',
    time: '',
    numofLessons: 0
  };

  newClass: Class = {
    courseId: '',
    classId: '',
    listStudent: []
  };

  @ViewChild('addCourseForm') addCourseForm: any; // Template reference variable for add form

  constructor(private courseService: CourseService, private classService: ClassService) { }

  ngOnInit(): void {
    this.loadCourses();
    this.loadClasses();
  }

  toggleAddCourseModal() {
    this.showAddCourseModal = !this.showAddCourseModal;
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  addCourse(course: Course) {
    this.courseService.addCourse(course).subscribe((course) => {
      this.courses.push(course);
      this.toggleAddCourseModal();
      this.resetNewCourse();
    });
  }

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course.courseId).subscribe(() => {
      this.courses = this.courses.filter((c) => c.courseId !== course.courseId);
      this.deleteClassByCourse(course);
    });
  }

  resetNewCourse() {
    this.newCourse = {
      courseId: '',
      name: '',
      imgUrl: '',
      description: '',
      time: '',
      numofLessons: 0
    };
  }

  // Classes related methods...

  async loadClasses() {
    this.classService.getAllClasses().subscribe((Classes) => {
      this.Classes = Classes;
    });
  }

  openAddClassForm(course: Course) {
    let classId = 1;
    this.newClass.courseId = course.courseId;
    for (let i = 0; i < this.Classes.length; i++) {
      if (this.Classes[i].courseId === course.courseId) {
        classId++;
      }
    }
    this.addClass(classId);
  }

  addClass(classId: number) {
    this.newClass.classId = "L0" + classId.toString();
    this.classService.addClass(this.newClass).subscribe(() => {
      this.Classes.push(this.newClass);
      this.newClass = {
        courseId: '',
        classId: '',
        listStudent: []
      };
    });
  }

  deleteClass(classroom: Class) {
    this.classService.deleteClass(classroom.courseId, classroom.classId).subscribe(() => {
      this.Classes = this.Classes.filter((c) => c.classId !== classroom.classId && c.courseId !== classroom.courseId);
    });
  }

  deleteClassByCourse(course: Course) {
    this.classService.deleteClassByCourse(course.courseId).subscribe(() => {
      this.Classes = this.Classes.filter((c) => c.courseId !== course.courseId);
    });
  }

  sendData(classSelected: Class) {
    this.classService.changeData(classSelected);
  }
}

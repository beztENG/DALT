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
  courseEnable = false;
  showAddCourseForm = false;
  showEditCourseForm = false;
  showAddClassForm = false;
  selectedCourse: Course | null = null;
  editMode: boolean = false;
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
  @ViewChild('editCourseForm') editCourseForm: any; // Template reference variable for edit form

  constructor(private courseService: CourseService, private classService: ClassService) { }  
  
  ngOnInit(): void {
    this.loadCourses();
    this.loadClasses();
  }

  // Open and close add/edit student forms
  openAddCourseForm() {
    this.editMode = true;
    this.newCourse= {
      courseId: '',
      name: '',
      imgUrl: '',
      description: '',
      time: '',
      numofLessons: 0
    };; // Clear for new course
    this.showAddCourseForm = true;
  }
  closeAddCourseForm() {
    this.showAddCourseForm = false;
  }
  openEditCouseForm(course: Course) {
    this.editMode = true;
    this.selectedCourse = course; // Set for editing
    this.showEditCourseForm = true;
  }
  closeEditCourseForm() {
    this.showEditCourseForm = false;
  }
  cancelEdit() {
    this.selectedCourse = null;
  }

  //load
  loadCourses() {
    this.courseService.getAllCourses().subscribe((courses) => {
      this.courses = courses;      
    });
  }

  //add
  addCourse(course: Course) {
    this.courseService.addCourse(course).subscribe((course) => {
      this.courses.push(course);
      this.showAddCourseForm = false;
    });
  }
  //delete 
  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course.courseId).subscribe(() => {
      this.courses = this.courses.filter((c) => c.courseId !== course.courseId);
    });
  }
  //update
  updateCourse(course: Course) {
    this.courseService.updateCourse(course.courseId, course).subscribe((course) => {
      const index = this.courses.findIndex((c) => c.courseId === course.courseId);
      this.courses[index] = course;
      this.showEditCourseForm = false;
    });
  }
//////////////////Classes/////////////////////
  //load class
  async loadClasses() {    
    this.classService.getAllClasses().subscribe((Classes) => {
      this.Classes = Classes;      
    });
  }

  openAddClassForm(course: Course) {
    let classId = 1;
    this.showAddClassForm = true;
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
    });
    this.newClass = {
      courseId: '',
      classId: '',
      listStudent: []
    };    
  }

  //delete class
  deleteClass(classroom: Class) {
    this.classService.deleteClass(classroom.courseId, classroom.classId).subscribe(() => {
      this.Classes = this.Classes.filter((c) => c.classId !== classroom.classId && c.courseId !== classroom.courseId);
    });
  }

}



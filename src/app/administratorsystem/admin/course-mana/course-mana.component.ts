import { Component, ViewChild } from '@angular/core';
import { Course } from 'backend/src/models/courses.model';
import { Student } from 'src/app/administratorsystem/shared/interface/academicManagement/student';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-course-mana',
  templateUrl: './course-mana.component.html',
  styleUrls: ['./course-mana.component.css']
})
export class CourseManaComponent {
  courses: Course[] = [];
  showAddCourseForm = false;
  showEditCourseForm = false;
  selectedCourse: Course | null = null;
  editMode: boolean = false;
  newCourse: Course = {
    idCourse: '',
    name: '',
    imgUrl: '',
    description: '',
    time: '',
    numofLessons: 0
  };

  @ViewChild('addCourseForm') addCourseForm: any; // Template reference variable for add form
  @ViewChild('editCourseForm') editCourseForm: any; // Template reference variable for edit form

  constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    this.loadCourses();
  }

  // Open and close add/edit student forms
  openAddCourseForm() {
    this.editMode = true;
    this.newCourse= {
      idCourse: '',
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
    this.courseService.deleteCourse(course.idCourse).subscribe(() => {
      this.courses = this.courses.filter((c) => c.idCourse !== course.idCourse);
    });
  }
  //update
  updateCourse(course: Course) {
    this.courseService.updateCourse(course.idCourse, course).subscribe((course) => {
      const index = this.courses.findIndex((c) => c.idCourse === course.idCourse);
      this.courses[index] = course;
      this.showEditCourseForm = false;
    });
  }
}



import { Component } from '@angular/core';
import { Course } from '../administratorsystem/shared/interface/course/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent {
  courses: Course[] = [];
  searchKeyword: string = '';
  private courseService: CourseService;  
  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }
  //getAllCourses
  getAllCourses() {
    this.courseService.getAllCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }
  ngOnInit(): void {
    this.getAllCourses();
  }
}

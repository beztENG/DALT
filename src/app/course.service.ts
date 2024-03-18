import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses = [
    { id: 1, title: 'Basic English Grammar', description: 'Learn the basics of English grammar.' },
    { id: 2, title: 'Advanced English Vocabulary', description: 'Expand your English vocabulary with advanced words.' },
    { id: 3, title: 'Business English Communication', description: 'Learn English for professional communication.' }
  ];

  constructor() { }

  getCourses() {
    return this.courses;
  }

  getCourseById(id: number) {
    return this.courses.find(course => course.id === id);
  }
}

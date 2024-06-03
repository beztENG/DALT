import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../administratorsystem/shared/interface/course/course';
import { COURSE_URL, COURSE_BY_ID } from '../administratorsystem/shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) { }
  //getallcourses
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(COURSE_URL + '/all');
  }
  //getOneCourse
  getOneCourse(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${COURSE_BY_ID}/get/${courseId}`);
  }
  //addCourse
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${COURSE_URL}/add`, course);
  }
  //deleteCourse
  deleteCourse(courseId: string): Observable<{ message: string }> {
    return this.http.delete<any>(`${COURSE_BY_ID}/delete/${courseId}`);
  }
  //updateCourse
  updateCourse(courseId: string, updatedCourse: Course): Observable<Course> {
    return this.http.put<Course>(`${COURSE_BY_ID}/update/${courseId}`, updatedCourse);
  }
}

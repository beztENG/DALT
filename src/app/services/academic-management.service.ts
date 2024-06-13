import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../administratorsystem/shared/interface/academicManagement/student';
import { STUDENT_URL } from '../administratorsystem/shared/constants/url';
import { Class } from 'src/app/administratorsystem/shared/interface/class/class';

@Injectable({
  providedIn: 'root'
})
export class AcademicManagementService {

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(STUDENT_URL + '/students');
  }

  getStudentsByRegistrationDate(): Observable<Student[]> {
    return this.http.get<Student[]>(`${STUDENT_URL}/students/registration-date`);
  }

  searchStudents(keyword: string): Observable<Student[]> {
    const searchUrl = `${STUDENT_URL}/students/search?keyword=${keyword}`;
    return this.http.get<Student[]>(searchUrl);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${STUDENT_URL}/students/add`, student);
  }

  deleteStudent(studentId: string): Observable<{ message: string }> {
    return this.http.delete<any>(`${STUDENT_URL}/students/${studentId}/delete`);
  }

  updateStudent(studentId: string, updatedStudent: Student): Observable<Student> {
    return this.http.put<Student>(`${STUDENT_URL}/students/${studentId}/update`, updatedStudent);
  }

  enrollStudentInClass(studentId: string, classId: string): Observable<any> {
    return this.http.post<any>(`${STUDENT_URL}/students/${studentId}/enroll`, { classId });
  }

  getStudentClasses(studentId: string): Observable<Class[]> {
    return this.http.get<Class[]>(`${STUDENT_URL}/students/${studentId}/classes`);
  }  
}

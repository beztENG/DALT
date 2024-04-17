import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../administratorsystem/shared/interface/academicManagement/student';
import { STUDENT_URL } from '../administratorsystem/shared/constants/url';

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
}

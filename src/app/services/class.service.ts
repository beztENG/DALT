import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from '../administratorsystem/shared/interface/class/class';
import { CLASS_URL } from '../administratorsystem/shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  constructor(private http: HttpClient) { }
  //getAll
  getAllClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(CLASS_URL + '/all');
  }
  //getOne
  getClassByCourse(courseId: string): Observable<Class[]> {
    return this.http.get<Class[]>(`${CLASS_URL}/get/${courseId}`);
  }
  //addClass
  addClass(classs: Class): Observable<Class> {
    return this.http.post<Class>(`${CLASS_URL}/add`, classs);
  }
  //addStudentToClass
  addStudentToClass(classId: string, studentId: string): Observable<Class> {
    return this.http.put<Class>(`${CLASS_URL}/addStudent/${classId}/${studentId}`, {});
  }
  //deleteClass
  deleteClass(classId: string): Observable<{ message: string }> {
    return this.http.delete<any>(`${CLASS_URL}/delete/${classId}`);
  }
  //updateClass
  updateClass(classId: string, updatedClass: Class): Observable<Class> {
    return this.http.put<Class>(`${CLASS_URL}/update/${classId}`, updatedClass);
  }
}

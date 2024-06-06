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
  addClass(classroom: Class): Observable<Class> {
    return this.http.post<Class>(`${CLASS_URL}/add`, classroom);
  }
  //addStudentToClass
  addStudentToClass(classId: string, studentId: string): Observable<Class> {
    return this.http.put<Class>(`${CLASS_URL}/addStudent/${classId}/${studentId}`, {});
  }
  //deleteClass
  deleteClass(courseId: string, classId: string): Observable<Class> {
    return this.http.delete<Class>(`${CLASS_URL}/delete/${courseId}/${classId}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
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
  //getOneClass
  getOneClass(courseId: string, classId: string): Observable<Class> {
    return this.http.get<Class>(`${CLASS_URL}/get/${courseId}/${classId}`);
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
  //deleteClass by courseId
  deleteClassByCourse(courseId: string): Observable<Class> {
    return this.http.delete<Class>(`${CLASS_URL}/delete/${courseId}`);
  }

  enrollStudentInClass(studentId: string, classId: string): Observable<any> {
    return this.http.post<any>(`${CLASS_URL}/students/${studentId}/enroll`, { classId });
  }

  getStudentClasses(studentId: string): Observable<Class[]> {
    return this.http.get<Class[]>(`${CLASS_URL}/students/${studentId}/classes`);
  }
  //Transfer data
  private dataSource = new BehaviorSubject<Class>({
    courseId: '',
    classId: '',
    listStudent: []
  });
  currentData = this.dataSource.asObservable();

  changeData(data: Class) {
    this.dataSource.next(data);
  }  
}

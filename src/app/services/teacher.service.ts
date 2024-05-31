import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../administratorsystem/shared/interface/academicManagement/teacher';
import { TEACHERTIMETABLEURL } from '../administratorsystem/shared/constants/url';


@Injectable({
    providedIn: 'root'
})
export class TeacherService {


    constructor(private http: HttpClient) { }
 
    getTeachers(): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(TEACHERTIMETABLEURL);
    }

    createTeacher(teacher: Teacher): Observable<Teacher> {
        return this.http.post<Teacher>(TEACHERTIMETABLEURL, teacher);
    }

    updateTeacher(id: string, teacher: Teacher): Observable<Teacher> {
        return this.http.put<Teacher>(`${TEACHERTIMETABLEURL}/${id}`, teacher);
    }

    deleteTeacher(id: string): Observable<void> {
        return this.http.delete<void>(`${TEACHERTIMETABLEURL}/${id}`);
    }
}

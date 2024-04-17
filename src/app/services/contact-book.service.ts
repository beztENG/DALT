import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/student';
import { CONTACTBOOK_URL, CONTACTBOOK_BY_ID } from '../administratorsystem/shared/constants/url';


@Injectable({
  providedIn: 'root'
})
export class ContactBookService {

  constructor(private http: HttpClient) { }

  // getAllContacts(): Observable<Student[]> {
  //   return this.http.get<Student[]>(CONTACTBOOK_URL);
  // }

  getContactById(contactId: string): Observable<Student> {
    const url = `${CONTACTBOOK_BY_ID}${contactId}`;
    return this.http.get<Student>(url);
  }
}

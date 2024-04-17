import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { USER_LOGIN_URL } from '../administratorsystem/shared/constants/url';
import { IUser } from '../administratorsystem/shared/interface/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  [x: string]: any;
  loggedIn = false;

  constructor(private http: HttpClient) { }

  login(userLogin: IUser): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin);
  }
}

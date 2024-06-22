import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../administratorsystem/shared/interface/user/user';
import { USER_LOGIN_URL } from '../administratorsystem/shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedIn = false;

  constructor(private http: HttpClient) { }

  login(userLogin: IUser): Observable<any> {
    return this.http.post<any>(USER_LOGIN_URL, userLogin)
      .pipe(
        map(res => {
          if (res && res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.user.role);
            localStorage.setItem('name', res.user.name);
          }
          return res;
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    return localStorage.getItem('name');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.loggedIn = false;
  }
}

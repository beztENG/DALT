import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../interface/user/user';
import { USER_LOGIN_URL } from '../administratorsystem/constants/url';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedIn = false;
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, 
    { email, password }).pipe(
      tap(() => {
        this.loggedIn = true;
      })
    );
  }
}

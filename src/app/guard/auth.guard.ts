import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.checkLoginStatus();
    const token = this.authService.getToken();
    const role = this.authService.getUserRole();
    const expectedRole = next.data['role'];

    if (token && role === expectedRole) {
      return true;
    }

    this.router.navigate(['/warning'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

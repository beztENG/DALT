import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/administratorsystem/shared/interface/user/user';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

onSubmit() {
  this.submitted = true;
  this.error = '';

  if (this.loginForm.invalid) {
    return;
  }

  this.loading = true;
  const userLogin: IUser = {
    email: this.f.email.value,
    password: this.f.password.value,
    role: 'student',
  };

  this.authenticationService.login(userLogin)
    .subscribe(
      (data: any) => {
        console.log(data);
        this.loading = false;
        
        this.authenticationService.loggedIn = true;
        if (data && data.user && data.user.role) {
          const userRole = data.user.role;
          if (userRole === 'student') {
            localStorage.setItem('email', userLogin.email);
            this.router.navigate(['/student']);
          }
        }
      },
      (error) => {
        console.log(error);
        this.error = 'Tên đăng nhập hoặc mật khẩu không chính xác';
        this.loading = false;
      }
    );
}

}

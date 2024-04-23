import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/administratorsystem/shared/interface/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
    // Kiểm tra xem có thông tin người dùng trong localStorage không
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      // Đăng nhập tự động nếu có thông tin người dùng trong localStorage
      this.authenticationService.loggedIn = true;
      // Điều hướng người dùng đến trang phù hợp tùy thuộc vào vai trò của họ
      const userRole = JSON.parse(currentUser).role;
      if (userRole === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
    }
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
      role: 'admin',
    };

    this.authenticationService.login(userLogin)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.loading = false;
          this.authenticationService.loggedIn = true;
          if (data && data.user && data.user.role) {
            const userRole = data.user.role;
            if (userRole === 'admin') {
              this.router.navigate(['/admin']);
            }
          }
        },
        (error) => {
          console.log(error);
          this.error = 'Nhập sai tên đăng nhập hoặc mật khẩu';
          this.loading = false;
        }
      );
  }
}
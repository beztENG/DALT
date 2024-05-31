import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

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
    const token = this.authenticationService.getToken();
    if (token) {
      this.authenticationService.loggedIn = true;
      this.router.navigate(['/home']);
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
    const userLogin = {
      email: this.f.email.value,
      password: this.f.password.value
    };

    this.authenticationService.login(userLogin)
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.authenticationService.loggedIn = true;
          if (data && data.token) {
            localStorage.setItem('email', userLogin.email);
            const userRole = data.user.role;
            if (userRole === 'admin') {
              this.router.navigate(['/admin/dashboard']);
            } else if (userRole === 'student') {
              this.router.navigate(['/student']);
            }
          }
        },
        (error) => {
          console.log(error);
          this.error = 'Incorrect username or password';
          this.loading = false;
        }
      );
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent {
  constructor(private router: Router) {}

  

  goBack() {
    const role = localStorage.getItem('role');
    if(!role){
      this.router.navigate(['/login']);
    }else if (role === 'admin'){
      this.router.navigate(['/admin/dashboard']);
    }else if(role === 'student'){
      this.router.navigate(['/student/dashboard']);
    }
  }
}

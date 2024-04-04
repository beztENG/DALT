import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
    
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed
  }
}

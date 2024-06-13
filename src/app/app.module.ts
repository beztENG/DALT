import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { BottomComponent } from './bottom/bottom.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { NavidasComponent } from './navidas/navidas.component';
import { CourseComponent } from './course/course.component';
import { BannerComponent } from './banner/banner.component';
import { ChildrenStudyComponent } from './children-study/children-study.component';
import { CourselistComponent } from './courselist/courselist.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EventsComponent } from './events/events.component';
import { EventspageComponent } from './events/eventspage/eventspage.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BodyComponent } from './administratorsystem/admin/body/body.component';
import { SidenavComponent } from './administratorsystem/admin/sidenav/sidenav.component';
import { DashboardComponent } from './administratorsystem/admin/dashboard/dashboard.component';
import { SettingsComponent } from './administratorsystem/admin/settings/settings.component';
import { LoginComponent } from './administratorsystem/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './administratorsystem/admin/admin.component';
import { RegistrationListComponent } from './administratorsystem/admin/registration-list/registration-list.component';
import { StudentComponent } from './administratorsystem/student/student.component';
import { StudentDashboardComponent } from './administratorsystem/student/student-dashboard/student-dashboard.component';
import { StudentManagementComponent } from './administratorsystem/admin/student-management/student-management.component';
import { TeacherAdminComponent } from './administratorsystem/admin/teacher-admin/teacher-admin.component';
import { CourseManaComponent } from './administratorsystem/admin/course-mana/course-mana.component';
import { AdultStudyComponent } from './adult-study/adult-study.component';
import { RegisterformComponent } from './registerform/registerform.component';






@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    SlideshowComponent,
    RegistrationComponent,
    BottomComponent,
    AchievementsComponent,
    NavidasComponent,
    CourseComponent,
    NavbarComponent,
    BannerComponent,
    ChildrenStudyComponent,
    CourselistComponent,
    HomepageComponent,
    EventsComponent,
    EventspageComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    SettingsComponent,
    LoginComponent,
    AdminComponent,
    RegistrationListComponent,
    StudentComponent,
    StudentDashboardComponent,
    StudentManagementComponent,
    TeacherAdminComponent,
    StudentManagementComponent,
    CourseManaComponent,
    AdultStudyComponent,
    RegisterformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

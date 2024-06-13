import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenStudyComponent } from './children-study/children-study.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventsComponent } from './events/events.component';
import { EventspageComponent } from './events/eventspage/eventspage.component';
import { DashboardComponent } from './administratorsystem/admin/dashboard/dashboard.component';
import { SettingsComponent } from './administratorsystem/admin/settings/settings.component';
import { LoginComponent } from './administratorsystem/login/login.component';
import { AdminComponent } from './administratorsystem/admin/admin.component';
import { CourselistComponent } from './courselist/courselist.component';
import { RegistrationListComponent } from './administratorsystem/admin/registration-list/registration-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { StudentComponent } from './administratorsystem/student/student.component';
import { StudentDashboardComponent } from './administratorsystem/student/student-dashboard/student-dashboard.component';
import { StudentManagementComponent } from './administratorsystem/admin/student-management/student-management.component';
import { TeacherAdminComponent } from './administratorsystem/admin/teacher-admin/teacher-admin.component';
import { CourseManaComponent } from './administratorsystem/admin/course-mana/course-mana.component';
import { AdultStudyComponent } from './adult-study/adult-study.component';
import { RegisterformComponent } from './registerform/registerform.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'childrenstudy', component: ChildrenStudyComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'eventspage/:id', component: EventspageComponent },
  { path: 'adultstudy', component: AdultStudyComponent },
  { path: 'register', component: RegisterformComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginStudent', redirectTo: 'login', pathMatch: 'full' }, // Redirect to single login component

  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'setting', component: SettingsComponent },
      { path: 'studentManagement', component: StudentManagementComponent },
      { path: 'registrationList', component: RegistrationListComponent },
      { path: 'TeacherAdmin', component: TeacherAdminComponent },
      { path: 'courseManagement', component: CourseManaComponent },

    ]
  },

  {
    path: 'student', component: StudentComponent, children: [
      { path: 'dashboard', component: StudentDashboardComponent }
    ]
  },

  { path: 'student/:studentId', component: StudentComponent },

  { path: 'courseslist', component: CourselistComponent },
  { path: 'registration', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

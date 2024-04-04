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

import { BodyComponent } from './administratorsystem/body/body.component';
import { SidenavComponent } from './administratorsystem/sidenav/sidenav.component';
import { DashboardComponent } from './administratorsystem/dashboard/dashboard.component';
import { ProductsComponent } from './administratorsystem/products/products.component';
import { StatisticsComponent } from './administratorsystem/statistics/statistics.component';
import { CoupensComponent } from './administratorsystem/coupens/coupens.component';
import { PagesComponent } from './administratorsystem/pages/pages.component';
import { MediaComponent } from './administratorsystem/media/media.component';
import { SettingsComponent } from './administratorsystem/settings/settings.component';
import { LoginComponent } from './administratorsystem/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './administratorsystem/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
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
    ProductsComponent,
    StatisticsComponent,
    CoupensComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    LoginComponent,
    AdminComponent,
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

import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/slideshow/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BottomComponent } from './components/bottom/bottom.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { NavidasComponent } from './components/navidas/navidas.component';
import { CourseComponent } from './components/course/course.component';
import { BannerComponent } from './components/banner/banner.component';
import { EventsComponent } from './components/events/events.component';
import { EventspageComponent } from './components/events/eventspage/eventspage.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    BottomComponent,
    AchievementsComponent,
    NavidasComponent,
    CourseComponent,
    NavbarComponent,
    BannerComponent,
    EventsComponent,
    EventspageComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

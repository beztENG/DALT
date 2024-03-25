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

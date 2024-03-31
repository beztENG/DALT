import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenStudyComponent } from './children-study/children-study.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventsComponent } from './events/events.component';
import { EventspageComponent } from './events/eventspage/eventspage.component';
import { CourselistComponent } from './courselist/courselist.component';

const routes: Routes = [
  { path:'', component: HomepageComponent},
  { path: 'childrenstudy', component: ChildrenStudyComponent},
  { path: 'aboutus', component: AboutUsComponent},
  { path:'events', component:EventsComponent},
  { path: 'eventspage/:id', component:EventspageComponent },
  { path: 'courseslist', component:CourselistComponent},
  // { path: '', redirectTo: '/courses', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

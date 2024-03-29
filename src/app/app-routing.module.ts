import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenStudyComponent } from './children-study/children-study.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EventsComponent } from './events/events.component';
import { EventspageComponent } from './events/eventspage/eventspage.component';

const routes: Routes = [
  { path:'', component: HomepageComponent},
  { path: 'childrenstudy', component: ChildrenStudyComponent},
  { path: 'events', component:EventsComponent},
  { path: 'eventspage/:id', component:EventspageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

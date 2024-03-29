import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { EventspageComponent } from './components/events/eventspage/eventspage.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'events', component: EventsComponent } ,
  {path: 'event/:id',component:EventspageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

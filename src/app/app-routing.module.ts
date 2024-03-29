import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenStudyComponent } from './children-study/children-study.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  { path:'', component: HomepageComponent},
  { path: 'childrenstudy', component: ChildrenStudyComponent},
  // { path: '', redirectTo: '/courses', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenStudyComponent } from './children-study/children-study.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventsComponent } from './events/events.component';
import { EventspageComponent } from './events/eventspage/eventspage.component';
import { DashboardComponent } from './administratorsystem/dashboard/dashboard.component';
import { ProductsComponent } from './administratorsystem/products/products.component';
import { StatisticsComponent } from './administratorsystem/statistics/statistics.component';
import { CoupensComponent } from './administratorsystem/coupens/coupens.component';
import { PagesComponent } from './administratorsystem/pages/pages.component';
import { MediaComponent } from './administratorsystem/media/media.component';
import { SettingsComponent } from './administratorsystem/settings/settings.component';
import { LoginComponent } from './administratorsystem/login/login.component';
import { AdminComponent } from './administratorsystem/admin/admin.component';
const routes: Routes = [
  { path:'', component: HomepageComponent},
  { path: 'childrenstudy', component: ChildrenStudyComponent},
  { path: 'aboutus', component: AboutUsComponent},
  { path:'events', component:EventsComponent},
  { path: 'eventspage/:id', component:EventspageComponent },
  
    { path: 'admin', component: AdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'coupens', component: CoupensComponent },
      { path: 'pages', component: PagesComponent },
      { path: 'media', component: MediaComponent },
      { path: 'setting', component: SettingsComponent },
      {path: 'login', component:LoginComponent},
    ]},

  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

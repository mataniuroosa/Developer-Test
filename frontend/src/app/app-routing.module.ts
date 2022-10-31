import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { CreateAppointmentComponent } from './component/create-appointment/create-appointment.component';
import { SerachAppointmentComponent } from './component/serach-appointment/serach-appointment.component';
import { GetAllAppointmentComponent } from './component/get-all-appointment/get-all-appointment.component';
import { HistoryAppointmentComponent } from './component/history-appointment/history-appointment.component';
import { DetailsAppointmentComponent } from './component/details-appointment/details-appointment.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [{
      path: 'create-appointment',
      component: CreateAppointmentComponent,
    },{
      path: 'search-appointment',
      component: SerachAppointmentComponent,
    },{
      path: 'all-appointment',
      component: GetAllAppointmentComponent,
    },{
      path: 'history-appointment',
      component: HistoryAppointmentComponent,
    },{
      path: 'details-appointment',
      component: DetailsAppointmentComponent,
    }]
  },{
  path: 'login', component: LoginComponent
},{
  path: 'logout', component: LoginComponent
},{
  path: 'register', component: RegisterComponent
},{
  path: '**', component: LoginComponent
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { CreateAppointmentComponent } from './component/create-appointment/create-appointment.component';
import { SerachAppointmentComponent } from './component/serach-appointment/serach-appointment.component';
import { GetAllAppointmentComponent } from './component/get-all-appointment/get-all-appointment.component';
import { HistoryAppointmentComponent } from './component/history-appointment/history-appointment.component';
import { DetailsAppointmentComponent } from './component/details-appointment/details-appointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    CreateAppointmentComponent,
    SerachAppointmentComponent,
    GetAllAppointmentComponent,
    HistoryAppointmentComponent,
    DetailsAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

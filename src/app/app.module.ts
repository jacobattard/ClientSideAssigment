import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDroneComponent } from './components/add-drone/add-drone.component';
import { ViewDronesComponent } from './components/view-drones/view-drones.component';
import { RegistrationDetailsComponent } from './components/registration-details/registration-details.component';
import { UpdateDroneComponent } from './components/update-drone/update-drone.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDroneComponent,
    ViewDronesComponent,
    RegistrationDetailsComponent,
    UpdateDroneComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

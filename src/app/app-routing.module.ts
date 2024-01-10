import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDroneComponent } from './components/add-drone/add-drone.component';
import { ViewDronesComponent } from './components/view-drones/view-drones.component';
import { RegistrationDetailsComponent } from './components/registration-details/registration-details.component';
import { UpdateDroneComponent } from './components/update-drone/update-drone.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'add-drone', component: AddDroneComponent },
  { path: 'view-drones', component: ViewDronesComponent },
  { path: 'registration/:id', component: RegistrationDetailsComponent }, 
  { path: 'update-drone/:id', component: UpdateDroneComponent }, 
  { path: 'login', component: LoginComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

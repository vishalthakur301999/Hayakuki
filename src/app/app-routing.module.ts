import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OnewaylistComponent} from './searchlist/onewaylist/onewaylist.component';
import {LoginComponent} from './User/login/login.component';
import {SignupComponent} from './User/signup/signup.component';
import {ProfileComponent} from './User/profile/profile.component';
import {AuthGuard} from './authorization/authguard.guard';
import {OnewaybookingComponent} from './booking/onewaybooking/onewaybooking.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'onewaylist', component: OnewaylistComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'onewaybooking', component: OnewaybookingComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

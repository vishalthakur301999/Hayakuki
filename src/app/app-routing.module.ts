import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OnewaylistComponent} from './searchlist/onewaylist/onewaylist.component';
import {LoginComponent} from './User/login/login.component';
import {SignupComponent} from './User/signup/signup.component';
import {ProfileComponent} from './User/profile/profile.component';
import {AuthGuard} from './authorization/authguard.guard';
import {OnewaybookingComponent} from './booking/onewaybooking/onewaybooking.component';
import {BookingsComponent} from './User/bookings/bookings.component';
import {TestComponent} from './test/test.component';
import {AdminflightComponent} from './adminconsole/adminflight/adminflight.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'onewaylist', component: OnewaylistComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'bookings', component: BookingsComponent},
  {path: 'test', component: TestComponent},
  {path: 'adminflight', component: AdminflightComponent},
  {path: 'onewaybooking', component: OnewaybookingComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

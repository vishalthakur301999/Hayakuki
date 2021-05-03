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
import {RoundtriplistComponent} from './searchlist/roundtriplist/roundtriplist.component';
import {RoundtripbookingComponent} from './booking/roundtripbooking/roundtripbooking.component';
import {BlogcreateComponent} from './blog/blogcreate/blogcreate.component';
import {BlogeditComponent} from './blog/blogedit/blogedit.component';
import {BlogComponent} from './blog/blog.component';
import {BlogPostComponent} from './blog/blog-post/blog-post.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'onewaylist', component: OnewaylistComponent},
  {path: 'roundtriplist', component: RoundtriplistComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard]},
  {path: 'test', component: TestComponent},
  {path: 'blog-create', component: BlogcreateComponent, canActivate: [AuthGuard]},
  {path: 'blog-edit/:id', component: BlogeditComponent, canActivate: [AuthGuard]},
  {path: 'blog-list', component: BlogComponent},
  {path: 'blog-post/:id', component: BlogPostComponent},
  {path: 'adminflight', component: AdminflightComponent, canActivate: [AuthGuard]},
  {path: 'onewaybooking', component: OnewaybookingComponent, canActivate: [AuthGuard]},
  {path: 'roundtripbooking', component: RoundtripbookingComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

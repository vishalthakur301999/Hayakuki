import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule} from './Material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FlightsearchComponent } from './home/flightsearch/flightsearch.component';
import { StoriesComponent } from './home/stories/stories.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchlistComponent } from './searchlist/searchlist.component';
import { OnewaylistComponent } from './searchlist/onewaylist/onewaylist.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './User/login/login.component';
import { SignupComponent } from './User/signup/signup.component';
import {AuthorizationService} from './authorization/authorization.service';
import { ProfileComponent } from './User/profile/profile.component';
import { OnewaybookingComponent } from './booking/onewaybooking/onewaybooking.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightsearchComponent,
    StoriesComponent,
    SearchlistComponent,
    OnewaylistComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    OnewaybookingComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
    ],
  providers: [AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

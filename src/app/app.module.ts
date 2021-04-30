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
import { OnewaylistComponent } from './searchlist/onewaylist/onewaylist.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './User/login/login.component';
import { SignupComponent } from './User/signup/signup.component';
import {AuthorizationService} from './authorization/authorization.service';
import { ProfileComponent } from './User/profile/profile.component';
import { OnewaybookingComponent } from './booking/onewaybooking/onewaybooking.component';
import { BookingsComponent } from './User/bookings/bookings.component';
import { TestComponent } from './test/test.component';
import { AdminflightComponent } from './adminconsole/adminflight/adminflight.component';
import { AdminflightcreateComponent } from './adminconsole/adminflightcreate/adminflightcreate.component';
import { AdminflighteditComponent } from './adminconsole/adminflightedit/adminflightedit.component';
import { Test2Component } from './test/test2/test2.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RoundtriplistComponent } from './searchlist/roundtriplist/roundtriplist.component';
import { RoundonwardComponent } from './searchlist/roundtriplist/roundonward/roundonward.component';
import { RoundreturnComponent } from './searchlist/roundtriplist/roundreturn/roundreturn.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightsearchComponent,
    StoriesComponent,
    OnewaylistComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    OnewaybookingComponent,
    BookingsComponent,
    TestComponent,
    AdminflightComponent,
    AdminflightcreateComponent,
    AdminflighteditComponent,
    Test2Component,
    RoundtriplistComponent,
    RoundonwardComponent,
    RoundreturnComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
    ],
  providers: [AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

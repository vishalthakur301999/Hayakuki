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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightsearchComponent,
    StoriesComponent,
    SearchlistComponent,
    OnewaylistComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

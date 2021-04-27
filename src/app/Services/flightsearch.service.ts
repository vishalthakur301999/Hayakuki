import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsearchService {
  baseurl = 'https://localhost:5001/api/Flight/';
  constructor(private http: HttpClient) {}
  // tslint:disable-next-line:typedef
  searchFlights(FlightQuery: object){
    return this.http.post(this.baseurl, FlightQuery);
  }
}

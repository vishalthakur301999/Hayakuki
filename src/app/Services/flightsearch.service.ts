import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsearchService {
  baseurl = 'https://localhost:5001/api/FlightQuery/';
  constructor(private http: HttpClient) {}
  // tslint:disable-next-line:typedef
  searchFlights(FlightQuery: object){
    return this.http.post(this.baseurl, FlightQuery);
  }
  getSingleFlight(flightNo: string): Observable<object>{
    return this.http.get(this.baseurl + flightNo);
  }
}

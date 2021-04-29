import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminflightService {
  baseurl = 'https://localhost:5001/api/FlightAdmin/';
  constructor( private http: HttpClient) { }
  getAllFlights(): Observable<object> {
    return this.http.get(this.baseurl);
  }
  getOneFlight(Fno: string): Observable<object>{
    return this.http.get(this.baseurl + Fno);
  }
  postFlight( data: any): Observable<object> {
    return this.http.post(this.baseurl, data);
  }
  putFlight(data: any, Fno: string): Observable<object>{
    return this.http.put(this.baseurl + Fno, data);
  }
  delFlight(Fno: string): Observable<object>{
    return this.http.delete(this.baseurl + Fno);
  }
}

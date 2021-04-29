import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportfetchService {
  baseurl = 'https://localhost:5001/api/AirportFetch/';
  constructor( private http: HttpClient) { }
  getAllAirports(): Observable<object>{
    return this.http.get(this.baseurl);
  }
  getOneAirport(Code: string): Observable<object>{
    return this.http.get(this.baseurl + Code);
  }
}

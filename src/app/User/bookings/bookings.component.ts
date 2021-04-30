import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class BookingsComponent implements OnInit {
  panelOpenState = false;
  baseurl = 'https://localhost:5001/api/Bookings/';
  constructor( private http: HttpClient) { }
  ngOnInit(): void {
  }
  fetchAllBookings(userid: string): Observable<object>{
    return this.http.get(this.baseurl + userid);
  }
  deleteBooking(bookingid: string): Observable<object>{
    return this.http.delete(this.baseurl + bookingid);
  }
  editTicket(ticketid: string, data: any): Observable<object>{
    return this.http.put(this.baseurl + ticketid, data);
  }

}

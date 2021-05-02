import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDetailsService} from '../../authorization/user-details.service';
import {FlightsearchService} from '../../Services/flightsearch.service';
import {tick} from '@angular/core/testing';
import {coerceStringArray} from '@angular/cdk/coercion';
import {AirportfetchService} from '../../Services/airportfetch.service';

export interface BOBJ{
  bookingID: string;
  flightNumber: string;
  flight: any;
  sourceAirport: any;
  destAirport: any;
}

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class BookingsComponent implements OnInit {
  panelOpenState = false;
  dataloaded = false;
  userdetails: any;
  ticketsData: any;
  bookingIDs: string[] = [];
  bookingIDObject: BOBJ[] = [];
  len = 0;
  count = 0;
  baseurl = 'https://localhost:5001/api/Bookings/';
  constructor( private http: HttpClient, private ud: UserDetailsService,
               private fs: FlightsearchService, private apf: AirportfetchService) { }
  ngOnInit(): void {
    this.ud.currentMessage.subscribe( e => {
      this.userdetails = e;
    });
    this.fetchAllBookings(this.userdetails.userId).subscribe( f => {
      this.ticketsData = f;
      this.len = this.ticketsData.length;
      for (const ticketsDatum of this.ticketsData) {
        if (!this.bookingIDs.includes(ticketsDatum.bookingId)){
          this.bookingIDs.push(ticketsDatum.bookingId);
          const temp: BOBJ = {
            bookingID: ticketsDatum.bookingId,
            flightNumber: ticketsDatum.flightNumber,
            flight: null,
            sourceAirport: null,
            destAirport: null
          };
          this.fs.getSingleFlight(ticketsDatum.flightNumber).subscribe( g => {
            temp.flight = g;
            this.apf.getOneAirport(temp.flight.sourceCode).subscribe(x => {
              temp.sourceAirport = x;
              this.apf.getOneAirport(temp.flight.destCode).subscribe( y => {
                temp.destAirport = y;
                this.bookingIDObject.push(temp);
                this.count++;
              });
            });
          });
        }
        else{
          this.count++;
        }
      }
    });
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


/*
for (const ticketsDatum of this.ticketsData) {
        if (!this.bookingIDs.includes(ticketsDatum.BookingID)) {
          this.bookingIDs.push(ticketsDatum.BookingID);
          let passcount = 0;
          for (const ticketsDatum1 of this.ticketsData) {
            if (ticketsDatum1.BookingID === ticketsDatum.BookingID) {
              passcount++;
            }
          }
          const temp: BOBJ = {
            bookingID: ticketsDatum.BookingID,
            passCount: passcount,
            flightNumber: ticketsDatum.flightNumber,
            flight: null
          };
          this.bookingIDObject.push(temp);
        }
      }
      const blen = this.bookingIDObject.length;
      let count = 0;
      for (let bo of this.bookingIDObject) {
        count++;
        let flightfetch: any;
        this.fs.getSingleFlight(bo.flightNumber).subscribe( g => {
          flightfetch = g;
          bo = flightfetch;
          if (count === blen){
            console.log(this.bookingIDObject);
          }
        });
      }
 */

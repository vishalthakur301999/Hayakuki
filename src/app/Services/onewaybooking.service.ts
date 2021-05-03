import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserDetailsService} from '../authorization/user-details.service';
import { Guid } from 'guid-typescript';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OnewaybookingService {
  oneWayQuery = {
    from: '',
    to: '',
    dot: '',
    passengers: 0,
    flight: []
  };
  ticketStructure = {
    bookingId: '',
    userId: '',
    passengerName: '',
    passengerAge: 0,
    passengerGender: '',
    flightNumber: '',
    seatNumber: '',
    travelDate: '',
    bookingAmount: 0
  };
  bookingactive = false;
  baseurl = 'https://localhost:5001/api/Ticket/';
  private messageSource = new BehaviorSubject(this.oneWayQuery);
  currentMessage = this.messageSource.asObservable();
  constructor( private route: Router, private http: HttpClient, private ud: UserDetailsService,
               private snackBar: MatSnackBar) { }
  // tslint:disable-next-line:typedef
  changeMessage(data: any, flight: any){
    this.oneWayQuery.from = data.from;
    this.oneWayQuery.to = data.to;
    this.oneWayQuery.dot = data.dot;
    this.oneWayQuery.passengers = data.passengers;
    this.oneWayQuery.flight = flight;
    this.messageSource.next(this.oneWayQuery);
    console.log(this.oneWayQuery);
    this.bookingactive = true;
    this.initiateBooking();
  }
  checkIfBookingInProgress(): void{
    this.initiateBooking();
  }
  initiateBooking(): void{
    if (this.oneWayQuery.from === ''){
      this.route.navigate(['home']);
    }else{
      let temp;
      this.ud.currentMessage.subscribe(e => temp = e);
      if (temp === null){
        this.route.navigate(['login']);
      }else{
        this.route.navigate(['onewaybooking']);
      }
    }
  }
  dbBooking(ts: object): Observable<object>{
    return this.http.post(this.baseurl, ts);
  }
  bookTicket(owq: any, passengerDetails: any, passcount: number): void{
    let temp: any; this.ud.currentMessage.subscribe(e => temp = e);
    const currentBID = Guid.create().toString();
    const fare = owq.flight.fare * passcount;
    console.log(passengerDetails);
    for (const passenger of passengerDetails.quantities) {
        this.ticketStructure.bookingId = currentBID;
        this.ticketStructure.userId = temp.userId;
        this.ticketStructure.passengerName = passenger.name;
        this.ticketStructure.passengerAge = passenger.age;
        this.ticketStructure. passengerGender = passenger.gender;
        this.ticketStructure.flightNumber = owq.flight.flightNumber;
        this.ticketStructure.seatNumber = '';
        this.ticketStructure.travelDate =  owq.dot;
        this.ticketStructure.bookingAmount = fare;
        console.log(this.ticketStructure);
        this.dbBooking(this.ticketStructure).subscribe( e => {
          this.openSnackBar('Booking Successful');
          this.bookingactive = false;
          this.route.navigate(['bookings']);
        });
    }
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}

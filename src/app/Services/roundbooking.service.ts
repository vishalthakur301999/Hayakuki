import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserDetailsService} from '../authorization/user-details.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Guid} from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class RoundbookingService {
  roundQuery = {
    from: '',
    to: '',
    dot: '',
    dor: '',
    passengers: 0,
    onwardflight: [],
    returnflight: []
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
  private messageSource = new BehaviorSubject(this.roundQuery);
  currentMessage = this.messageSource.asObservable();
  constructor( private route: Router, private http: HttpClient, private ud: UserDetailsService, private snackBar: MatSnackBar) { }
  changeMessage(data: any, onwardflight: any, returnflight: any): void{
    this.roundQuery.from = data.from;
    this.roundQuery.to = data.to;
    this.roundQuery.dot = data.dot;
    this.roundQuery.dor = data.dor;
    this.roundQuery.passengers = data.passengers;
    this.roundQuery.onwardflight = onwardflight;
    this.roundQuery.returnflight = returnflight;
    this.messageSource.next(this.roundQuery);
    console.log(this.roundQuery);
    this.bookingactive = true;
    this.initiateBooking();
  }
  checkIfBookingInProgress(): void{
    this.initiateBooking();
  }
  initiateBooking(): void{
    if (this.roundQuery.from === ''){
      this.route.navigate(['home']);
    }else{
      let temp;
      this.ud.currentMessage.subscribe(e => temp = e);
      if (temp === null){
        this.route.navigate(['login']);
      }else{
        this.route.navigate(['roundtripbooking']);
      }
    }
    this.route.navigate(['roundtripbooking']);
  }
  dbBooking(ts: object): Observable<object>{
    return this.http.post(this.baseurl, ts);
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  bookTicket(owq: any, passengerDetails: any, passcount: number): void{
    let temp: any; this.ud.currentMessage.subscribe(e => temp = e);
    const onwardBID = Guid.create().toString();
    const returnBID = Guid.create().toString();
    const onwardfare = owq.onwardflight.fare * passcount;
    const returnfare = owq.returnflight.fare * passcount;
    let count = 1;
    console.log(passengerDetails);
    for (const passenger of passengerDetails.quantities) {
      count++;
      this.ticketStructure.bookingId = onwardBID;
      this.ticketStructure.userId = temp.userId;
      this.ticketStructure.passengerName = passenger.name;
      this.ticketStructure.passengerAge = passenger.age;
      this.ticketStructure.passengerGender = passenger.gender;
      this.ticketStructure.flightNumber = owq.onwardflight.flightNumber;
      this.ticketStructure.seatNumber = '';
      this.ticketStructure.travelDate =  owq.dot;
      this.ticketStructure.bookingAmount = onwardfare;
      console.log(this.ticketStructure);
      this.dbBooking(this.ticketStructure).subscribe( e => {
        this.ticketStructure.bookingId = returnBID;
        this.ticketStructure.flightNumber = owq.returnflight.flightNumber;
        this.ticketStructure.travelDate = owq.dor;
        this.ticketStructure.bookingAmount = returnfare;
        this.dbBooking(this.ticketStructure).subscribe(f => {
          const st = f;
          console.log(st);
          if (count === passcount){
            this.route.navigate(['bookings']);
          }
        });
      });
    }
  }
}

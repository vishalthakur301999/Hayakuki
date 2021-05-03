import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDetailsService} from '../../authorization/user-details.service';
import {FlightsearchService} from '../../Services/flightsearch.service';
import {tick} from '@angular/core/testing';
import {coerceStringArray} from '@angular/cdk/coercion';
import {AirportfetchService} from '../../Services/airportfetch.service';
import {count} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface BOBJ{
  bookingID: string;
  flightNumber: string;
  passCount: number;
  fare: number;
  travelDate: string;
  flight: any;
  sourceAirport: any;
  destAirport: any;
}
export interface DialogData {
  name: string;
  age: number;
  gender: string;
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
  bookingIDs: any;
  bookingIDObject: BOBJ[] = [];
  len = 500;
  count = 0;
  baseurl = 'https://localhost:5001/api/Bookings/';
  baseurlbkg = 'https://localhost:5001/api/BookingID/';
  tempobj: BOBJ = {
    bookingID: '',
    flightNumber: '',
    passCount: 0,
    fare: 0,
    travelDate: '',
    flight: null,
    sourceAirport: null,
    destAirport: null,
  };
  tempreq: any = {
    bid: ''
  };
  constructor( private http: HttpClient, private ud: UserDetailsService,
               private fs: FlightsearchService, private apf: AirportfetchService,
               public dialog: MatDialog, public router: Router, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.ud.currentMessage.subscribe( e => {
      this.userdetails = e;
      this.fetchUserBookings(this.userdetails.userId).subscribe( f => {
        this.bookingIDs = f;
        this.len = this.bookingIDs.length;
        this.count = 0;
        this.fetchAllBookings(this.userdetails.userId).subscribe( p => this.ticketsData = p);
        for (const bookingID of this.bookingIDs) {
          this.bookingIDObject.push({
            bookingID,
            flightNumber: '',
            passCount: 0,
            fare: 0,
            travelDate: '',
            flight: null,
            sourceAirport: null,
            destAirport: null,
          });
        }
        for (const bidobj of this.bookingIDObject) {
          this.tempreq.bid = bidobj.bookingID;
          this.fetchByBookingID(this.tempreq).subscribe( g => {
            const temp: any = g;
            bidobj.flightNumber = temp[0].flightNumber;
            bidobj.passCount = temp[0].passCount;
            bidobj.fare = temp[0].bookingAmount;
            bidobj.travelDate = temp[0].travelDate;
            this.fs.getSingleFlight(bidobj.flightNumber).subscribe( k => {
              bidobj.flight = k;
              this.apf.getOneAirport(bidobj.flight.sourceCode).subscribe(x => {
                bidobj.sourceAirport = x;
                this.apf.getOneAirport(bidobj.flight.destCode).subscribe( y => {
                  bidobj.destAirport = y;
                  this.count++;
                  if (this.count === this.len){
                    this.sortArray();
                  }
                });
              });
            });
          });
        }
      });
    });
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  sortArray(): void{
    this.bookingIDObject.sort((a, b) => (a.travelDate < b.travelDate ? 1 : -1));
  }
  fetchUserBookings(id: string): Observable<object>{
    return this.http.get(this.baseurlbkg + id);
  }
  fetchByBookingID(id: any): Observable<object>{
    return this.http.post(this.baseurlbkg, id);
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
  dformatter(d: string): string{
    return d.substr(0, 10);
  }
  initDelete( id: string): void{
    const cfrm = confirm('Are you sure you want to cancel?');
    if (cfrm) {
      this.deleteBooking(id).subscribe( del => {
        // Here is the other part of the trick
        this.openSnackBar('Booking Cancelled');
        this.redirectTo('/bookings');
      });
    }
  }
  redirectTo(uri: string): void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }
  openDialog(ticketdata: any): void {
    const dialogRef = this.dialog.open(TicketEditDialogComponent, {
      width: '250px',
      data: {name: ticketdata.passengerName, age: ticketdata.passengerAge, gender: ticketdata.passengerGender}
    });
    dialogRef.afterClosed().subscribe(result => {
      const res = result;
      ticketdata.passengerName = result.name;
      ticketdata.passengerAge = result.age;
      ticketdata.passengerGender = result.gender;
      this.editTicket(ticketdata.ticketId, ticketdata).subscribe( editresult => {
        const t = editresult;
        this.openSnackBar('Edit Successful');
      });
    });
  }
}


@Component({
  selector: 'app-bookings-dialog',
  templateUrl: 'dialogview.html',
})
export class TicketEditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TicketEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


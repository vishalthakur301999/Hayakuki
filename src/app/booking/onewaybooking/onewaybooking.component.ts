import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OnewaybookingService} from '../../Services/onewaybooking.service';
import {Subscription} from 'rxjs';
import {AirportfetchService} from '../../Services/airportfetch.service';

@Component({
  selector: 'app-onewaybooking',
  templateUrl: './onewaybooking.component.html',
  styleUrls: ['./onewaybooking.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class OnewaybookingComponent{
  // @ts-ignore
  passengerform: FormGroup; subscription: Subscription; selectedFlight: any; sourceAirport: any; destAirport: any;
  constructor(private fb: FormBuilder, private onewayBooking: OnewaybookingService, private airportFetch: AirportfetchService) {
    this.subscription = this.onewayBooking.currentMessage.subscribe( m => this.selectedFlight = m );
    this.airportFetch.getOneAirport(this.selectedFlight.from).subscribe(e => this.sourceAirport = e);
    this.airportFetch.getOneAirport(this.selectedFlight.to).subscribe(e => this.destAirport = e);
    console.log(this.selectedFlight);
    this.passengerform = this.fb.group({
      quantities: this.fb.array([]) ,
    });
    const initialvalue = this.selectedFlight.passengers;
    for (let i = 0; i < initialvalue; i++){
      this.quantities().push(this.newQuantity());
    }
  }

  quantities(): FormArray {
    return this.passengerform.get('quantities') as FormArray;
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: 'Male'
    });
  }

  addQuantity(): void {
    this.selectedFlight.passengers++;
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number): void {
    this.selectedFlight.passengers--;
    this.quantities().removeAt(i);
  }

  onSubmit(): void {
    console.log(this.passengerform.value);
  }
  pad(num: number, size: number): string {
    const numstr = num.toString();
    const len = numstr.length;
    if (len === size){
      return numstr;
    }else{
      return '0' + numstr;
    }
  }
  dformatter(d: Date): string{
    return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
  }
  startBooking(): void{
    this.onewayBooking.bookTicket(this.selectedFlight, this.passengerform.value, this.selectedFlight.passengers);
  }
}

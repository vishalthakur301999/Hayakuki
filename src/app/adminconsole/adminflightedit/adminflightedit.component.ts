import { Component, OnInit } from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminflightService} from '../adminflight/adminflight.service';
import {AdminflightComponent} from '../adminflight/adminflight.component';
import {Airport} from '../../home/flightsearch/flightsearch.component';
import {Observable} from 'rxjs';

export interface Flight {
  flightNumber: string;
  sourceCode: string;
  destCode: string;
  airline: string;
  aircraftType: string;
  deptTime: string;
  arrivalTime: string;
  duration: string;
  fare: number;
}
@Component({
  selector: 'app-adminflightedit',
  templateUrl: './adminflightedit.component.html',
  styleUrls: ['./adminflightedit.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class AdminflighteditComponent implements OnInit {
  editFlight: FormGroup;
  flights: Flight[] = [];
  deptCtrl = new FormControl();
  filteredFlights: Observable<Flight[]>;
  // @ts-ignore
  apFetchServer: object;
  constructor(private adminDB: AdminflightService, private parent: AdminflightComponent) {
    this.adminDB.getAllFlights().subscribe( e =>
    {
      this.apFetchServer = e;
      // @ts-ignore
      for (const apfs of this.apFetchServer) {
        this.flights.push(apfs);
      }
    });
    this.filteredFlights = this.deptCtrl.valueChanges
      .pipe(
        startWith(''),
        map(flight => flight ? this._filterStates(flight) : this.flights.slice())
      );
    this.editFlight = new FormGroup({
      flightNumber: new FormControl('', [Validators.required]),
      sourceCode: new FormControl('', [ Validators.required, Validators.pattern('[A-Z]{3}')]),
      destCode: new FormControl('', [ Validators.required, Validators.pattern('[A-Z]{3}')]),
      airline: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{1,}')]),
      aircraftType: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{1,}')]),
      deptTime: new FormControl('', [Validators.required, Validators.pattern('[0-9:]{5}')]),
      arrivalTime: new FormControl('', [Validators.required, Validators.pattern('[0-9:]{5}')]),
      duration: new FormControl('', [Validators.required]),
      fare: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    this.adminDB.postFlight(this.editFlight.value).subscribe(e => {
      const x = e;
      alert('Created');
      this.parent.ngOnInit();
    });
  }
  private _filterStates(value: string): Flight[] {
    const filterValue = value.toLowerCase();
    return this.flights.filter(flight => flight.flightNumber.toLowerCase().indexOf(filterValue) === 0);
  }
  search(): void{
    if (this.deptCtrl.value !== ''){
      this.adminDB.getOneFlight(this.deptCtrl.value).subscribe( e => {
        const searched: any = e;
        this.editFlight.patchValue({
          flightNumber: searched.flightNumber,
          sourceCode: searched.sourceCode,
          destCode: searched.destCode,
          airline: searched.airline,
          aircraftType: searched.aircraftType,
          deptTime: searched.deptTime,
          arrivalTime: searched.arrivalTime,
          duration: searched.duration,
          fare: searched.fare
        });
      });
    }
  }
  delete(): void{
    if (this.deptCtrl.value !== ''){
      const cfm = confirm('Confirm Delete?');
      if (cfm){
        this.adminDB.delFlight(this.deptCtrl.value).subscribe( e => {
          const result: any = e;
          alert('Deleted');
          this.parent.ngOnInit();
        }, error => {
          const er = error;
          if (er.status === 404){
            alert('Flight Number does not exist');
          }
        });
      }
    }
  }

  edit(): void{
    this.adminDB.putFlight(this.editFlight.value, this.editFlight.controls.flightNumber.value).subscribe( e => {
      alert('edited');
      this.parent.ngOnInit();
    }, error => {
      const er = error;
      if (er.status === 404){
        alert('Flight Number does not exist');
      }
    });
  }
  refresh(): void{
    this.adminDB.getAllFlights().subscribe( e =>
    {
      this.apFetchServer = e;
      // @ts-ignore
      for (const apfs of this.apFetchServer) {
        this.flights.push(apfs);
      }
    });
    this.filteredFlights = this.deptCtrl.valueChanges
      .pipe(
        startWith(''),
        map(flight => flight ? this._filterStates(flight) : this.flights.slice())
      );
  }
}

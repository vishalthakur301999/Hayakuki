import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {OnewayquerydataService} from '../../Services/onewayquerydata.service';
import {Router} from '@angular/router';
import {AirportfetchService} from '../../Services/airportfetch.service';
import {RoundquerydataService} from '../../Services/roundquerydata.service';

export interface Airport {
  city: string;
  airportCode: string;
  country: string;
}

@Component({
  selector: 'app-flightsearch',
  templateUrl: './flightsearch.component.html',
  styleUrls: ['./flightsearch.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})

export class FlightsearchComponent implements OnInit {
  minDate;
  curDate = new Date();
  minpass = 1;
  nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // @ts-ignore
  tripType = 'oneway';
  deptCtrl = new FormControl();
  arrivalCtrl = new FormControl();
  filteredArrival: Observable<Airport[]>;
  filteredDept: Observable<Airport[]>;
  // @ts-ignore
  apFetchServer: object;
  airports: Airport[] = [];
  constructor( private odqds: OnewayquerydataService, private route: Router,
               private airportService: AirportfetchService, private rtqds: RoundquerydataService ) {
    this.minDate = new Date();
    this.airportService.getAllAirports().subscribe( e =>
    {
      this.apFetchServer = e;
      // @ts-ignore
      for (const apfs of this.apFetchServer) {
        this.airports.push(apfs);
      }
    });
    this.filteredArrival = this.arrivalCtrl.valueChanges
      .pipe(
        startWith(''),
        map(airport => airport ? this._filterStates(airport) : this.airports.slice())
      );
    this.filteredDept = this.deptCtrl.valueChanges
      .pipe(
        startWith(''),
        map(airport => airport ? this._filterStates(airport) : this.airports.slice())
      );
  }

  ngOnInit(): void {
  }
  oneWaySubmit(data: any): void{
    if (this.deptCtrl.value !== '' && this.arrivalCtrl.value !== ''){
      const qdata = {
        from : this.deptCtrl.value,
        to : this.arrivalCtrl.value,
        dot: data.dot,
        passengers: data.count,
        sortby: 'Fare',
        sortdirection: 'asc'
      };
      this.odqds.changeMessage(qdata);
      this.route.navigate(['onewaylist']);
    }
  }
  roundTripSubmit(data: any): void{
    if (data.dor !== '' || this.deptCtrl.value !== '' || this.arrivalCtrl.value !== ''){
      if (this.deptCtrl.value !== '' && this.arrivalCtrl.value !== ''){
        const qdata = {
          from : this.deptCtrl.value,
          to : this.arrivalCtrl.value,
          dot: data.dot,
          dor: data.dor,
          passengers: data.count,
          sortby: 'Fare',
          sortdirection: 'asc'
        };
        this.rtqds.changeMessage(qdata);
        this.route.navigate(['roundtriplist']);
      }
    }
  }
  private _filterStates(value: string): Airport[] {
    const filterValue = value.toLowerCase();
    return this.airports.filter(airport => (airport.city.toLowerCase() + airport.airportCode.toLowerCase()).includes(filterValue));
  }
}



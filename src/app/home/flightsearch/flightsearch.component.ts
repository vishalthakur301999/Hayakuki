import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {OnewayquerydataService} from '../../Services/onewayquerydata.service';
import {Router} from '@angular/router';

export interface User {
  name: string;
}

@Component({
  selector: 'app-flightsearch',
  templateUrl: './flightsearch.component.html',
  styleUrls: ['./flightsearch.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})



export class FlightsearchComponent implements OnInit {
  minDate;
  curDate = new Date();
  // @ts-ignore
  tripType = 'oneway'; filteredOptions: Observable<User[]>;
  myControl = new FormControl();
  options: User[] = [
    {name: 'DEL'},
    {name: 'MAA'},
    {name: 'BLR'}
  ];
  nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor( private odqds: OnewayquerydataService, private route: Router) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  oneWaySubmit(data: any): void{
    const qdata = {
      from : data.from.name,
      to : data.to.name,
      dot : new Date()
    };
    this.odqds.changeMessage(qdata);
    this.route.navigate(['onewaylist']);
  }
}



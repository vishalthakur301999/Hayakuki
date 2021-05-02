import { Component, OnInit } from '@angular/core';
import {OnewayquerydataService} from '../../../Services/onewayquerydata.service';
import {Router} from '@angular/router';
import {OnewaybookingService} from '../../../Services/onewaybooking.service';
import {FlightsearchService} from '../../../Services/flightsearch.service';
import {RoundquerydataService} from '../../../Services/roundquerydata.service';
import {RoundselectService} from '../roundselect.service';

@Component({
  selector: 'app-roundonward',
  templateUrl: './roundonward.component.html',
  styleUrls: ['./roundonward.component.css', '../../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class RoundonwardComponent implements OnInit {

  orderby = 'Fare'; sort = 'asc';
  // @ts-ignore
  queryData: any; subscription: Subscription; queryResult: any; currorderby; currsort;
  constructor(private odqds: RoundquerydataService, private route: Router,
              private fs: FlightsearchService,
              private roundselect: RoundselectService) { }

  ngOnInit(): void {
    this.subscription = this.odqds.currentMessage.subscribe( m => this.queryData = m );
    if (this.queryData.from === null || this.queryData.to === null){
      this.route.navigate(['home']);
    }else{
      const qstrct = {
        from: this.queryData.from,
        to: this.queryData.to,
        sortby: this.queryData.sortby,
        sortdirection: this.queryData.sortdirection
      };
      this.currorderby = this.queryData.sortby;
      this.currsort = this.queryData.sortdirection;
      console.log(qstrct);
      this.fs.searchFlights(qstrct).subscribe(e => {
        this.queryResult = e;
        console.log(this.queryResult);
        if (this.queryResult.length === 0){
          // this.route.navigate(['home']);
        }
      });
    }
  }
  refresh(): void{
    if (this.orderby !== this.currorderby || this.sort !== this.currsort){
      this.subscription = this.odqds.currentMessage.subscribe( m => this.queryData = m );
      if (this.queryData.from === ''){
        this.route.navigate(['home']);
      }else{
        const qstrct = {
          from: this.queryData.from,
          to: this.queryData.to,
          sortby: this.orderby,
          sortdirection: this.sort
        };
        this.currorderby = this.orderby;
        this.currsort = this.sort;
        this.fs.searchFlights(qstrct).subscribe(e => this.queryResult = e);
      }
    }
  }
  pick(flight: any): void{
    this.roundselect.setOnward(flight);
  }

}

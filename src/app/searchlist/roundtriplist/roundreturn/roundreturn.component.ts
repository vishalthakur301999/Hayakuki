import { Component, OnInit } from '@angular/core';
import {RoundquerydataService} from '../../../Services/roundquerydata.service';
import {FlightsearchService} from '../../../Services/flightsearch.service';
import {Router} from '@angular/router';
import {OnewaybookingService} from '../../../Services/onewaybooking.service';
import {RoundselectService} from '../roundselect.service';
import {RoundbookingService} from '../../../Services/roundbooking.service';

@Component({
  selector: 'app-roundreturn',
  templateUrl: './roundreturn.component.html',
  styleUrls: ['./roundreturn.component.css', '../../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class RoundreturnComponent implements OnInit {
  flag = false;
  orderby = 'Fare'; sort = 'asc';
  // @ts-ignore
  queryData: any; subscription: Subscription; queryResult: any; currorderby; currsort;
  constructor(private odqds: RoundquerydataService, private route: Router,
              private fs: FlightsearchService,
              private roundselect: RoundselectService) { }

  ngOnInit(): void {
    this.subscription = this.odqds.currentMessage.subscribe( m => this.queryData = m );
    this.roundselect.removeReturn();
    if (this.queryData.from === null || this.queryData.to === null){
      this.route.navigate(['home']);
    }else{
      const qstrct = {
        from: this.queryData.to,
        to: this.queryData.from,
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
          this.route.navigate(['home']);
        }
        this.flag = true;
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
    this.roundselect.setReturn(flight);
  }
}

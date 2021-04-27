import { Component, OnInit } from '@angular/core';
import {OnewayquerydataService} from '../../Services/onewayquerydata.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FlightsearchService} from '../../Services/flightsearch.service';

@Component({
  selector: 'app-onewaylist',
  templateUrl: './onewaylist.component.html',
  styleUrls: ['./onewaylist.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class OnewaylistComponent implements OnInit {
  // @ts-ignore
  queryData: any; subscription: Subscription; queryResult: any;
  constructor(private odqds: OnewayquerydataService, private route: Router, private fs: FlightsearchService) { }

  ngOnInit(): void {
    this.subscription = this.odqds.currentMessage.subscribe( m => this.queryData = m );
    console.log(this.queryData);
    if (this.queryData.from === ''){
      this.route.navigate(['home']);
    }
    this.fs.searchFlights(this.queryData).subscribe(e => this.queryResult = e);
    console.log(this.queryResult);
  }

}

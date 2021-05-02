import { Component, OnInit } from '@angular/core';
import {RoundselectService} from './roundselect.service';
import {RoundquerydataService} from '../../Services/roundquerydata.service';
import {Subscription} from 'rxjs';
import {RoundbookingService} from '../../Services/roundbooking.service';

@Component({
  selector: 'app-roundtriplist',
  templateUrl: './roundtriplist.component.html',
  styleUrls: ['./roundtriplist.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class RoundtriplistComponent implements OnInit {
  round: any = null; returnflight: any = null;
  queryData: any; subscription: Subscription;
  constructor(private roundSelect: RoundselectService, private odqds: RoundquerydataService, private rbs: RoundbookingService) {
    this.subscription = this.odqds.currentMessage.subscribe( m => this.queryData = m );
  }
  ngOnInit(): void {
  }
  onwardSelected(): boolean{
    if (this.roundSelect.checkOnward()){
      this.round = this.roundSelect.getOnward();
      return true;
    }
    else{
      return false;
    }
  }
  returnSelected(): boolean{
    if (this.roundSelect.checkReturn()){
      this.returnflight = this.roundSelect.getReturn();
      return true;
    }
    else{
      return false;
    }
  }
  removeOnward(): void{
    this.round = null;
    this.roundSelect.removeOnward();
  }
  removeReturn(): void{
    this.returnflight = null;
    this.roundSelect.removeReturn();
  }
  onSubmit(): void{
    this.rbs.changeMessage(this.queryData, this.round, this.returnflight);
  }
  dformatter(d: Date): string{
    return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
  }
  nullCheck(): boolean{
    if (this.round === null || this.returnflight === null){
      return false;
    }else{
      return true;
    }
  }
}



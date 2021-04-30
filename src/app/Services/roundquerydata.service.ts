import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoundquerydataService {
  oneWayQuery = {
    from: '',
    to: '',
    dot: '',
    dor: '',
    passengers: 0,
    sortby: '',
    sortdirection: ''
  };
  private messageSource = new BehaviorSubject(this.oneWayQuery);
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  // tslint:disable-next-line:typedef
  changeMessage(data: any){
    this.messageSource.next(data);
    console.log(data);
  }
}

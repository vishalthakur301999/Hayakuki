import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OnewayquerydataService {
  oneWayQuery = {
    from: '',
    to: '',
    dot: new Date()
  };
  private messageSource = new BehaviorSubject(this.oneWayQuery);
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  // tslint:disable-next-line:typedef
  changeMessage(data: any){
    this.messageSource.next(data);
  }
}

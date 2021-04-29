import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthorizationService} from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  dummy: any = null;
  private messageSource = new BehaviorSubject(this.dummy);
  currentMessage = this.messageSource.asObservable();
  baseurlGet = 'https://localhost:5001/api/User/';
  constructor( private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  changeMessage(data: any){
    this.messageSource.next(data);
  }
  getUserDetails(id: string): Observable<object>{
    return this.http.get(this.baseurlGet + id);
  }
  update(userId: string): void{
    let temp;
    this.getUserDetails(userId).subscribe( e => {
      temp = e;
      this.changeMessage(temp);
    });
  }
  clear(): void{
   this.dummy = null;
   this.changeMessage(this.dummy);
  }
}

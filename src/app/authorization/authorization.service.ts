import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Md5} from 'ts-md5';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {OnewaybookingService} from '../Services/onewaybooking.service';
import {UserDetailsService} from './user-details.service';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  // @ts-ignore
  creds: object; passhash; userdetails: any;
  loginStatus = false;
  loginQueryData = {
    uname: '',
  };
  passserver: any;
  private messageSource = new BehaviorSubject(this.loginStatus);
  currentMessage = this.messageSource.asObservable();
  baseurl = 'https://localhost:5001/api/UserLogin/';
  baseurlGet = 'https://localhost:5001/api/User/';
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router,
              private ud: UserDetailsService, private owb: OnewaybookingService) {}
  // tslint:disable-next-line:typedef
  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }
  loginInitiate(u: string, p: string): void{
    this.loginQueryData.uname = u;
    this.getServerPass(this.loginQueryData).subscribe( e => {
      this.passserver = e;
      if (this.passserver.password !== ''){
        const md5 = new Md5();
        this.passhash = md5.appendStr(p).end();
        if (this.passserver.password === this.passhash) {
          this.loginStatus = true;
          this.getUserDetails(this.passserver.id).subscribe(f => {
            this.userdetails = f;
            this.ud.changeMessage(this.userdetails);
            if (this.owb.bookingactive){
              this.owb.initiateBooking();
            }else{
              this.router.navigate(['home']);
            }
          });
        }
        else{
          this.openSnackBar('Invalid Credentials');
        }
      }
      else{
        this.openSnackBar('Invalid Credentials');
      }
    });
  }
  getServerPass(Loginquery: object): Observable<object>{
    return this.http.post(this.baseurl, Loginquery);
  }
  getUserDetails(id: string): Observable<object>{
    return this.http.get(this.baseurlGet + id);
  }
  logoutInitiate(): void{
    this.ud.clear();
    this.loginStatus = false;
    this.userdetails = null;
    this.router.navigate(['home']);
  }
  lgStatus(): boolean{
    if (sessionStorage.getItem('user') != null){
      return true;
    }
    else {
      return false;
    }
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}


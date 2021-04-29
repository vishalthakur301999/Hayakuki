import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Md5} from 'ts-md5';
import {Observable} from 'rxjs';
import {stringify} from '@angular/compiler/src/util';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthorizationService} from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  newUser = {
    name: '',
    email: '',
    userName: '',
    password: '',
    mobile: '',
    age: 0,
    gender: '',
    address: '',
    role: 'user'
  };
  result: any;
  baseurl = 'https://localhost:5001/api/User/';
  constructor( private router: Router, private http: HttpClient, private snackBar: MatSnackBar, private auth: AuthorizationService) {}
  postNewUser(name: string, email: string, userName: string, password: string,
              mobile: string, age: number, gender: string, address: string): void{
    this.newUser.name = name;
    this.newUser.userName = userName;
    this.newUser.email = email;
    this.newUser.mobile = mobile;
    this.newUser.age = age;
    this.newUser.gender = gender;
    this.newUser.address = address;
    const md5 = new Md5();
    this.newUser.password = md5.appendStr(password).end().toString();
    this.dbNewUser(this.newUser).subscribe( e => {
      this.result = e;
      this.openSnackBar('Signup Successfull');
      this.auth.loginInitiate(userName, password);
    });
  }
  dbNewUser(data: any): Observable<object>{
    return this.http.post(this.baseurl, data);
  }
  dbUpdate(data: any, userId: string): Observable<object>{
    return this.http.put(this.baseurl + userId, data);
  }
  dbDelete(userId: string): Observable<object>{
    return this.http.delete(this.baseurl + userId);
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {SignupService} from '../../authorization/signup.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class SignupComponent implements OnInit {
  unamecheckurl = 'https://localhost:5001/api/UsernameCheckCotroller/';
  hide = true;
  name = '';
  username = '';
  pass = '';
  confirmpass = '';
  email = '';
  mobile = '';
  gender = 'Male';
  bdate = new Date();
  age = 0;
  address = '';
  unameexist = false;
  // @ts-ignore
  constructor( private signup: SignupService, private snackBar: MatSnackBar, private http: HttpClient) { }

  ngOnInit(): void {}
  cpasscheck(): boolean{
    if (this.confirmpass === ''){
      return true;
    } else{
      if (this.confirmpass === this.pass){
        return true;
      }
      else{
        return false;
      }
    }
  }
  getUname(uname: string): Observable<object>{
    return this.http.get(this.unamecheckurl + uname);
  }
  searchUname(): void{
    this.getUname(this.username).subscribe(uec => {
      const res = uec;
      if (res){
        this.unameexist = true;
      }
      else{
        this.unameexist = false;
      }
      });
  }
  getAge(birthDate: Date): void {
    const today = new Date();
    this.age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      this.age = this.age - 1;
    }
  }
  passvalidcheck(): boolean{
    if (this.pass === ''){
      return true;
    }
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    const valid = regex.test(this.pass);
    return valid;
  }
  emailcheck(): boolean{
    if (this.email === ''){
      return true;
    }
    else{
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email);
    }
  }
  mobilecheck(): boolean{
    if (this.mobile === ''){
      return true;
    }
    else{
      return /^[0-9]{10}$/.test(this.mobile);
    }
  }
  onSubmit(data: any): void{
    let count = 0;
    if (this.name !== ''){
      count++;
    }
    else {
      this.openSnackBar('Name cannot be Empty');
    }
    if (!this.unameexist){
      count++;
    }
    else{
      this.openSnackBar('Please Pick another username');
    }
    if (this.username !== ''){
      count++;
    }
    else {
      this.openSnackBar('Username cannot be Empty');
    }
    if (this.cpasscheck() && this.pass !== ''){
      count++;
    }
    else{
      this.openSnackBar('Passwords can not be empty');
    }
    if (this.passvalidcheck() && this.pass !== ''){
      count++;
    }
    else{
      this.openSnackBar('Passwords can not be empty');
    }
    if (this.emailcheck() && this.email !== ''){
      count++;
    }
    else{
      this.openSnackBar('Email can not be empty');
    }
    if (this.mobilecheck() && this.mobile !== ''){
      count++;
    }
    else{
      this.openSnackBar('Email can not be empty');
    }
    if (this.address !== ''){
      count++;
    }
    else {
      this.openSnackBar('Address cannot be Empty');
    }
    if (count === 8){
      this.getAge(this.bdate);
      this.signup.postNewUser(this.name, this.email, this.username, this.pass, this.mobile, this.age, this.gender, this.address);
    }else{
      this.openSnackBar('Please fill All Fields');
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

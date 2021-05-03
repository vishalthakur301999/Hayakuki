import { Component, OnInit } from '@angular/core';
import {UserDetailsService} from '../../authorization/user-details.service';
import {Router} from '@angular/router';
import {SignupService} from '../../authorization/signup.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class ProfileComponent implements OnInit {
  hide = true;
  name = '';
  username = '';
  email = '';
  mobile = '';
  gender = 'Male';
  bdate = new Date();
  age = 0;
  address = '';
  updateuser = {
    userId: '',
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
  response: any;
  userdetails: any;
  fieldsetDisabled = true;
  posts: any;
  baseurl = 'https://localhost:5001/api/UserBlogs/';
  constructor( private pd: UserDetailsService, private route: Router, private signup: SignupService,
               private snackBar: MatSnackBar, private http: HttpClient) {
  }
  ngOnInit(): void {
    this.pd.currentMessage.subscribe( e => {
      this.userdetails = e;
      this.name = this.userdetails.name;
      this.username = this.userdetails.userName;
      this.email = this.userdetails.email;
      this.mobile = this.userdetails.mobile;
      this.gender = this.userdetails.gender;
      this.age = this.userdetails.age;
      this.address = this.userdetails.address;
      this.fetchAllBLogs(this.username).subscribe( e => this.posts = e);
    });
  }
  fetchAllBLogs(uname: string): Observable<object>{
    return this.http.get(this.baseurl + uname);
  }
  getAge(birthDate: Date): void {
    const today = new Date();
    this.age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      this.age = this.age - 1;
    }
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
  update(data: any): boolean{
    let count = 0;
    if (this.name !== ''){
      count++;
    }
    else {
      this.openSnackBar('Name Can not be Empty');
    }
    if (this.username !== ''){
      count++;
    }
    else {
      this.openSnackBar('Username Can not be Empty');
    }
    if (this.emailcheck() && this.email !== ''){
      count++;
    }
    else{
      this.openSnackBar('Email Can not be Empty');
    }
    if (this.mobilecheck() && this.mobile !== ''){
      count++;
    }
    else{
      this.openSnackBar('Mobile No. Can not be Empty');
    }
    if (this.address !== ''){
      count++;
    }
    else {
      this.openSnackBar('Address Can not be Empty');
    }
    if (count === 5){
      return true;
    }else{
      return false;
    }
  }
  formToggle(): void{
    if (!this.fieldsetDisabled){this.fieldsetDisabled = true; }
    else{ this.fieldsetDisabled = false; }
  }
  rld(): void{
    this.formToggle();
    this.ngOnInit();
  }
  updateUserFn(data: any): void{
    if (this.update(data)){
      this.updateuser.userId = this.userdetails.userId;
      this.updateuser.name = this.name;
      this.updateuser.email = this.email;
      this.updateuser.userName = this.username;
      this.updateuser.password = this.userdetails.password;
      this.updateuser.mobile = this.mobile;
      this.updateuser.age = this.age;
      this.updateuser.gender = this.gender;
      this.updateuser.address = this.address;
      this.updateuser.role = this.userdetails.role;
      console.log(this.updateuser);
      this.signup.dbUpdate(this.updateuser, this.userdetails.userId).subscribe(
        e => {
          this.response = e;
          this.openSnackBar('Updated');
          this.pd.update(this.userdetails.userId);
          this.formToggle();
          this.ngOnInit();
        }
      );
    }
  }
  delUserFn(): void{
    this.signup.dbDelete(this.userdetails.userId).subscribe(e => {
      this.response = e;
      this.openSnackBar('User Deleted');
      window.location.reload();
    });
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}

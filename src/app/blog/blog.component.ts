import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthorizationService} from '../authorization/authorization.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css', '../../../node_modules/tachyons/css/tachyons.min.css']
})
export class BlogComponent implements OnInit {
  baseurl = 'https://localhost:5001/api/Blog/';
  posts: any;
  constructor(private http: HttpClient, private router: Router, private auth: AuthorizationService) {
    this.fetchAllBLogs().subscribe( e => this.posts = e);
  }

  fetchAllBLogs(): Observable<object>{
    return this.http.get(this.baseurl);
  }
  ngOnInit(): void {
  }
  loginstatus(): boolean{
    return this.auth.loginStatus;
  }
  adminstatus(): boolean{
    if (this.auth.loginStatus){
      if (this.auth.role === 'admin'){
        return true;
      }
    }
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class StoriesComponent implements OnInit {
  baseurl = 'https://localhost:5001/api/Blog/';
  allposts: any;
  posts: any = [];
  constructor(private http: HttpClient, private router: Router) {
    this.fetchAllBLogs().subscribe( e => {
      this.allposts = e;
      for ( let i = 0 ; i < 4 ; i++){
        this.posts.push(this.allposts[i]);
      }
    });
  }

  fetchAllBLogs(): Observable<object>{
    return this.http.get(this.baseurl);
  }
  ngOnInit(): void {
  }
}

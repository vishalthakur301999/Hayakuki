import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDetailsService} from '../../authorization/user-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthorizationService} from '../../authorization/authorization.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class BlogPostComponent implements OnInit {
  baseurl = 'https://localhost:5001/api/Blog/';
  userdata: any;
  // @ts-ignore
  post; blogid; author; articletitle; articlecontents; imgurl; flag = false; posteddate; postid;
  constructor(private ar: ActivatedRoute, private http: HttpClient, private ud: UserDetailsService,
              private router: Router, private auth: AuthorizationService) {
    this.ud.currentMessage.subscribe( e => { this.userdata = e; });
    this.blogid = ar.snapshot.params.id;
    this.getPost(this.blogid).subscribe( e => {
      this.post = e;
      console.log(this.post);
      this.articletitle = this.post.articletitle;
      this.articlecontents = this.post.articlecontents;
      this.author = this.post.author;
      this.imgurl = this.post.imgurl;
      this.posteddate = this.post.posteddate;
      this.postid = this.post.blogid;
      this.flag = true;
      window.scrollTo(0, 0);
    });
  }
  getPost(id: string): Observable<object>{
    return this.http.get(this.baseurl + id);
  }
  ngOnInit(): void {

  }
  loginstatus(): boolean{
    if (this.auth.loginStatus){
      if (this.author === this.userdata.userName || this.auth.role === 'admin'){
        return true;
      }
    }
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDetailsService} from '../../authorization/user-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Blogtemplate} from '../blogcreate/blogcreate.component';
import {AuthorizationService} from '../../authorization/authorization.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-blogedit',
  templateUrl: './blogedit.component.html',
  styleUrls: ['./blogedit.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class BlogeditComponent implements OnInit {
  baseurl = 'https://localhost:5001/api/Blog/';
  userdata: any;
  imgurl = ''; blogid; post: any; articletitle = ''; articlecontents = ''; author = ''; flag = false;
  constructor(private ar: ActivatedRoute, private http: HttpClient, private ud: UserDetailsService,
              private router: Router, private auth: AuthorizationService, private snackBar: MatSnackBar) {
    this.ud.currentMessage.subscribe( e => { this.userdata = e; });
    this.blogid = ar.snapshot.params.id;
    this.getPost(this.blogid).subscribe( e => {
      this.post = e;
      if (this.post.author === this.userdata.userName || this.auth.role === 'admin'){
        console.log(this.post);
        this.articletitle = this.post.articletitle;
        this.articlecontents = this.post.articlecontents;
        this.author = this.post.author;
        this.imgurl = this.post.imgurl;
        this.flag = true;
        window.scrollTo(0, 0);
      }
      else {
        this.router.navigate(['/home']);
      }
    });
  }
  getPost(id: string): Observable<object>{
    return this.http.get(this.baseurl + id);
  }
  ngOnInit(): void {
  }
  editDB(id: string, post: Blogtemplate): Observable<object>{
    return this.http.put(this.baseurl + id, post);
  }
  onSubmit(data: any): void{
    if (data.title !== '' || data.content !== '' || data.imgurl !== ''){
      const temp: any = {
        blogid : this.blogid,
        articletitle : data.title,
        articlecontents : data.content,
        author : this.author,
        posteddate: new Date(),
        imgurl : data.imgurl
      };
      this.editDB(this.post.blogid, temp).subscribe( e => {
        this.openSnackBar('Edit Successful');
        if (this.auth.role === 'admin'){
          this.router.navigate(['/blog-list']);
        }else{
          this.router.navigate(['/blog-post/' + this.post.blogid]);
        }
      });
    } else {
      this.openSnackBar('Please Check All Fields');
    }
  }
  deleteinDB(id: string): Observable<object>{
    return this.http.delete(this.baseurl + id);
  }
  deleteblog(): void{
    const crfm = confirm('Confirm Delete?');
    if (crfm){
      this.deleteinDB(this.post.blogid).subscribe( e => {
        this.openSnackBar('Post Deleted');
        this.router.navigate(['/blog-list']);
      });
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

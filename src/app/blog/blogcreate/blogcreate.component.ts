import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDetailsService} from '../../authorization/user-details.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface Blogtemplate{
  articletitle: string;
  articlecontents: string;
  author: string;
  posteddate: Date;
  imgurl: string;
}
@Component({
  selector: 'app-blogcreate',
  templateUrl: './blogcreate.component.html',
  styleUrls: ['./blogcreate.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class BlogcreateComponent implements OnInit {
  baseurl = 'https://localhost:5001/api/Blog/';
  userdata: any;
  imgurl = '';
  constructor(private http: HttpClient, private ud: UserDetailsService, private router: Router,  private snackBar: MatSnackBar) {
    this.ud.currentMessage.subscribe( e => { this.userdata = e; });
  }

  ngOnInit(): void {
  }
  createDB(post: Blogtemplate): Observable<object>{
    return this.http.post(this.baseurl , post);
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  onSubmit(data: any): void{
    if (data.title !== '' || data.content !== '' || data.imgurl !== ''){
      const temp: Blogtemplate = {
        articletitle : data.title,
        articlecontents : data.content,
        author : this.userdata.userName,
        posteddate: new Date(),
        imgurl : data.imgurl
      };
      this.createDB(temp).subscribe( e => {
        this.openSnackBar('Posted');
        this.router.navigate(['/blog-list']);
      });
    }
    else {
      this.openSnackBar('Please Fill All Fields');
    }
  }
}

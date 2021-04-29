import {ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthorizationService} from './authorization/authorization.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../../node_modules/tachyons/css/tachyons.min.css']
})
export class AppComponent implements OnDestroy, OnInit{
  mobileQuery: MediaQueryList;
  mQL: () => void;
  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private auth: AuthorizationService) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mQL = () => this.changeDetectorRef.detectChanges();
  }
  ngOnInit(): void {
    this.mobileQuery.addEventListener('change', this.mQL);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mQL);
  }
  lgStatus(): boolean{
    return this.auth.loginStatus;
  }
  logoutFn(): void{
    this.auth.logoutInitiate();
  }
}

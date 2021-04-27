import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../../node_modules/tachyons/css/tachyons.min.css']
})
export class AppComponent implements OnDestroy, OnInit{
  collapsedNav = false;
  mobileQuery: MediaQueryList;
  mQL: () => void;
  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mQL = () => this.changeDetectorRef.detectChanges();
  }
  colNavToggle(): void{
    this.collapsedNav = this.collapsedNav ? this.collapsedNav = false : this.collapsedNav = true;
  }
  ngOnInit(): void {
    this.mobileQuery.addEventListener('change', this.mQL);
    setTimeout( () => { this.colNavToggle(); }, 1);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mQL);
  }
}

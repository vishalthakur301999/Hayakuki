import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../authorization/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(private auth: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(data: any): void {
    this.auth.loginInitiate(data.username, data.password);
  }
}

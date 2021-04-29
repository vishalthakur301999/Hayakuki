import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminflightService} from '../adminflight/adminflight.service';

@Component({
  selector: 'app-adminflightcreate',
  templateUrl: './adminflightcreate.component.html',
  styleUrls: ['./adminflightcreate.component.css', '../../../../node_modules/tachyons/css/tachyons.min.css']
})
export class AdminflightcreateComponent implements OnInit {
  createFlight: FormGroup;
  constructor(private adminDB: AdminflightService) {
    this.createFlight = new FormGroup({
      flightNumber: new FormControl('', [Validators.required]),
      sourceCode: new FormControl('', [ Validators.required, Validators.pattern('[A-Z]{3}')]),
      destCode: new FormControl('', [ Validators.required, Validators.pattern('[A-Z]{3}')]),
      airline: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{1,}')]),
      aircraftType: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{1,}')]),
      deptTime: new FormControl('', [Validators.required, Validators.pattern('[0-9:]{5}')]),
      arrivalTime: new FormControl('', [Validators.required, Validators.pattern('[0-9:]{5}')]),
      duration: new FormControl('', [Validators.required]),
      fare: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  ngOnInit(): void {
  }
  onSubmit(): void{
    this.adminDB.postFlight(this.createFlight.value).subscribe(e => {
      const x = e;
      alert('Created');
    });
  }
}

import {AfterViewInit, Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {AdminflightService} from './adminflight.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-adminflight',
  templateUrl: './adminflight.component.html',
  styleUrls: ['./adminflight.component.css']
})
export class AdminflightComponent implements OnInit, AfterViewInit {
  flightData: any;
  displayedColumns: string[] = ['flightNumber', 'sourceCode', 'destCode', 'airline', 'aircraftType', 'deptTime', 'arrivalTime', 'duration', 'fare'];
  // @ts-ignore
  dataSource: any; @ViewChild(MatSort) sort: MatSort; @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor( private adminflight: AdminflightService) { }

  ngOnInit(): void {
    this.adminflight.getAllFlights().subscribe( e => {
      this.flightData = e;
      this.dataSource = new MatTableDataSource(this.flightData);
      console.log(this.flightData[0]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit(): void {
  }
}

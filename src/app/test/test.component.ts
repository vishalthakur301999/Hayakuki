import {AfterContentInit, Component, Injectable, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {tickets} from './testdata';
import {tick} from '@angular/core/testing';
export interface Iticket{
  id: string;
  name: string;
  age: number;
  gender: string;
}
export interface BOBJ{
  bookingID: string;
  passCount: number;
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css', '../../../node_modules/tachyons/css/tachyons.min.css']
})
export class TestComponent implements OnInit {
  ticketsData = tickets;
  bookingIDs: string[] = [];
  bookingIDObject: BOBJ[] = [];
  // @ts-ignore
  userTable: FormGroup; control: FormArray; mode: boolean; parentForm: FormGroup;
  touchedRows: any;
  tickets: Iticket[] = [
    { id: '24h23h23eh2d', name: 'vishal', age: 21, gender: 'male'},
    { id: '345b35hvhvh3', name: 'Ravi', age: 17, gender: 'male'},
    { id: 'h52433hv345v', name: 'manisha', age: 20, gender: 'female'}
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    for (const ticketsDatum of this.ticketsData) {
      if (!this.bookingIDs.includes(ticketsDatum.BookingID)){
        this.bookingIDs.push(ticketsDatum.BookingID);
        let passcount = 0;
        for (const ticketsDatum1 of this.ticketsData) {
          if (ticketsDatum1.BookingID === ticketsDatum.BookingID){
            passcount++;
          }
        }
        const temp: BOBJ = {
          bookingID : ticketsDatum.BookingID,
          passCount : passcount
        };
        this.bookingIDObject.push(temp);
      }
    }
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
  }
  // tslint:disable-next-line:typedef
  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }
  load(): void{
    for (const ticket of this.tickets) {
      this.addRow(ticket);
    }
  }
  initiateForm(passenger: any): FormGroup {
    return this.fb.group({
      name: [passenger.name, Validators.required],
      age: [passenger.age, [Validators.required, Validators.pattern('[0-9]{1,3}'), Validators.min(0), Validators.max(120)]],
      gender: [passenger.gender],
      isEditable: [false],
      id: [passenger.id, Validators.required]
    });
  }
  // tslint:disable-next-line:typedef
  addRow(pas: Iticket) {
    const control = this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm(pas));
  }

  // tslint:disable-next-line:typedef
  editRow(group: AbstractControl) {
    // @ts-ignore
    group.get('isEditable').setValue(true);
  }
  // tslint:disable-next-line:typedef
  doneRow(group: AbstractControl) {
    // @ts-ignore
    group.get('isEditable').setValue(false);
    const control = this.userTable.get('tableRows') as FormArray;
    console.log(control.value[0]);
  }

  // tslint:disable-next-line:typedef
  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }
  // tslint:disable-next-line:typedef
  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls
      .filter(row => row.touched)
      .map(row => row.value);
    console.log(this.touchedRows);
  }

  // tslint:disable-next-line:typedef
  toggleTheme() {
    this.mode = !this.mode;
  }
}

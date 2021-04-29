import {AfterContentInit, Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css', '../../../node_modules/tachyons/css/tachyons.min.css']
})
export class TestComponent implements OnInit {
  // @ts-ignore
  userTable: FormGroup; control: FormArray; mode: boolean;
  touchedRows: any;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
  }
  // tslint:disable-next-line:typedef
  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      dob: ['', [Validators.required]],
      bloodGroup: [''],
      mobNumber: ['', [Validators.required, Validators.maxLength(10)]],
      isEditable: [true],
      id: ['', Validators.required]
    });
  }
  // tslint:disable-next-line:typedef
  addRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }
  // tslint:disable-next-line:typedef
  deleteRow(index: number) {
    const control = this.userTable.get('tableRows') as FormArray;
    control.removeAt(index);
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
  saveUserDetails() {
    console.log(this.userTable.value);
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

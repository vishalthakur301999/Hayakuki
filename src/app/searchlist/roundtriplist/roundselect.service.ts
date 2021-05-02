import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RoundselectService {
  onward: any = null;
  return: any = null;

  constructor() {
  }

  setOnward(data: any): void {
    this.onward = data;
  }

  setReturn(data: any): void {
    this.return = data;
  }

  checkOnward(): boolean {
    return this.onward !== null;
  }

  checkReturn(): boolean {
    return this.return !== null;
  }

  getOnward(): any {
    if (this.onward !== null) {
      return this.onward;
    }
  }

  getReturn(): any {
    if (this.return !== null) {
      return this.return;
    }
  }
  removeOnward(): void{
    this.onward = null;
  }
  removeReturn(): void{
    this.return = null;
  }
}

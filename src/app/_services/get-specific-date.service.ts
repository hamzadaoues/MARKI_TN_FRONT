import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSpecificDateService {

  constructor() { }

  getCurrentDate() {
    const x = new Date();
    const y = x.getFullYear().toString();
    let m = (x.getMonth() + 1).toString();
    let d = x.getDate().toString();
    if (d.length === 1) {d = '0' + d; }
    if (m.length === 1)  {m = '0' + m; }
    return ( y + '-' + m + '-' + d);
  }
  getYesterdayDate() {
    const x = new Date();
    const y = x.getFullYear().toString();
    let m = (x.getMonth() + 1).toString();
    let d = (x.getDate() - 1).toString();
    if (d.length === 1) {d = '0' + d; }
    if (m.length === 1)  {m = '0' + m; }
    return ( y + '-' + m + '-' + d);
  }
}

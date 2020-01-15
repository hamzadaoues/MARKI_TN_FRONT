import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_API, PAYMENT} from '../_globals/vars';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  doPayment(headers: HttpHeaders) {
    this.http.post(BASE_API + PAYMENT, {}, {headers})
      .subscribe(resp => {
        console.log(resp);
      });
  }
}

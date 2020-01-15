import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
const apiUrl = 'http://localhost:8084/forgot-password/';
@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(data: any): Observable<any> {
    return this.http.post<any>(apiUrl , data);
  }

  newPassword(data: any): Observable<any> {
    console.log('data to send');
    console.log(data);
    return this.http.post<any>(apiUrl + 'new-password' , data);
  }
}

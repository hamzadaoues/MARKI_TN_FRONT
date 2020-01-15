import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
const apiUrl = 'http://localhost:8084/auth/';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  constructor(private http: HttpClient) { }
  login(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'signin', data)
      .pipe(
        tap(_ => this.isLoggedIn = true),
        catchError(this.handleError('login', []))
      );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'signup', data)
      .pipe(
        tap(_ => this.log('login')),
        catchError(this.handleError('register', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  logOut() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }

  private log(message: string) {
    console.log(message);
  }
}

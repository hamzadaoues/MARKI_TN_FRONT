import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_KEY, API_SECRET, PAST_MATCHES} from '../_globals/vars';

@Injectable({
  providedIn: 'root'
})
export class GetPastMatchesService {
  constructor(private http: HttpClient) { }

  getPastMatches() {
    return this.http.get<any>( PAST_MATCHES + '?key=' + API_KEY + '&secret=' + API_SECRET + '&from=2019-01-01 &to=' + new Date());
  }
}

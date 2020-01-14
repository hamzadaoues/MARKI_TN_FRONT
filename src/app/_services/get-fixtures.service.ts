import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_KEY, API_SECRET, FEXTURES_MATCH_URL} from '../_globals/vars';

@Injectable({
  providedIn: 'root'
})
export class GetFixturesService {

  constructor(private http: HttpClient) {
  }

  getAllFixtures() {
    return this.http.get<any>(FEXTURES_MATCH_URL + '?key=' + API_KEY + '&secret=' + API_SECRET);
  }
}

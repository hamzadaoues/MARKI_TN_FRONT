import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_KEY, API_SECRET, STANDINGS_URL} from '../_globals/vars';

@Injectable({
  providedIn: 'root'
})
export class GetStandingsService {

  constructor(private http: HttpClient) { }

  getStandings(competitionId: number) {
    return this.http.get<any>( STANDINGS_URL + '?key=' + API_KEY + '&secret=' + API_SECRET + '&competition_id=' + competitionId);
  }
}

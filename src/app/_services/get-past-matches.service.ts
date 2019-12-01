import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_KEY, API_SECRET, LEAGUE_TEAMS, PAST_MATCHES} from '../_globals/vars';

@Injectable({
  providedIn: 'root'
})
export class GetPastMatchesService {
  constructor(private http: HttpClient) { }

  getPastMatches(competitionId: number, from: string, to: string) {
    return this.http.get<any>(
      PAST_MATCHES + '?key=' + API_KEY + '&secret=' + API_SECRET + '&competition_id=' + competitionId + '&from=' + from + '&to=' + to
    );
  }
  getLeagueTeams(leagueId: number) {
    return this.http.get<any>(
      LEAGUE_TEAMS + '?key=' + API_KEY + '&secret=' + API_SECRET + '&competitionId=' + leagueId
    );
  }
}

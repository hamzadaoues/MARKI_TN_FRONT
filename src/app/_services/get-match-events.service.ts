import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_KEY, API_SECRET, STANDINGS_URL} from '../_globals/vars';

@Injectable({
  providedIn: 'root'
})
export class GetMatchEventsService {

  constructor(private http: HttpClient) { }

  getLiveEvents(matchId: number) {
    return this.http.get<any>( STANDINGS_URL + '?key=' + API_KEY + '&secret=' + API_SECRET + '&match_id=' + matchId);
  }}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_KEY, API_SECRET, LIVE_SCORES_URL} from '../_globals/vars';

@Injectable({
  providedIn: 'root'
})
export class GetLiveMatchesService {

  constructor(private http: HttpClient) {
  }

  getLiveScores() {
    return this.http.get<any>(LIVE_SCORES_URL + '?key=' + API_KEY + '&secret=' + API_SECRET);
  }

}

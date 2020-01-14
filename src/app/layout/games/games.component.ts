import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GetLiveMatchesService} from '../../_services/get-live-matches.service';
import {LiveMatchModel} from '../../models/LiveMatchModel';
import {match} from 'minimatch';

declare let $: any;

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})


export class GamesComponent implements OnInit {

  played: boolean;
  liveMatches = [];
  split = [];
  @Output() loaded = new EventEmitter<boolean>();

  constructor(private liveMatchesService: GetLiveMatchesService) {

  }

  ngOnInit() {
    this.getLiveScores();
  }

  getLiveScores() {
    this.liveMatchesService.getLiveScores().subscribe((data: any) => {
      /*data.data.match.forEach((match) => {
        //   if (match.status === 'IN PLAY' || match.status === 'HALF TIME BREAK') {
        this.liveMatches.push(match);
        //}
      });*/
      // tslint:disable-next-line:no-shadowed-variable
      this.liveMatches = data.data.match.map((data) => {

        let match = new LiveMatchModel();
        match.away_name = data.away_name;
        match.home_name = data.home_name;
        match.id = data.id;
        match.score = data.score;
        match.fixture_id = data.fixture_id;
        match.played = false;
        return match;
      });
      this.loaded.emit(true);
      console.log(this.liveMatches);
    });
  }

  getHomeScore(matchScore: string) {
    this.split = matchScore.split('-');
    return this.split[0].trim();
  }

  getAwayScore(matchScore: string) {
    this.split = matchScore.split('-');
    return this.split[1].trim();
  }

  playMatch(match: LiveMatchModel) {
    match.played = true;
  }
}

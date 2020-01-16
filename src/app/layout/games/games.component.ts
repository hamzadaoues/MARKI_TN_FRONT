import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetLiveMatchesService} from '../../_services/get-live-matches.service';

declare let $: any;

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})


export class GamesComponent implements OnInit {

  liveMatches = [];
  split = [];
  loading = true;
  @Input() displayFooter;

  constructor(private liveMatchesService: GetLiveMatchesService) {
  }

  ngOnInit() {
    this.displayFooter = true;
    this.getLiveScores();
  }

  getLiveScores() {
    this.liveMatchesService.getLiveScores().subscribe((data: any) => {
      data.data.match.forEach((match) => {
        if (match.status === 'IN PLAY' || match.status === 'HALF TIME BREAK') {
          this.liveMatches.push(match);
        }
      });
      this.loading = false;
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
}

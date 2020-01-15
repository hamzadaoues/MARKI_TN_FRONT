import {Component, OnInit} from '@angular/core';
import {GetFixturesService} from '../_services/get-fixtures.service';
import {FixtureMatchModel} from '../models/FixtureMatchModel';
import {SheetCreationService} from '../_services/SheetCreation.service';
import {BetMatchModel} from '../models/betMatchModel';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  fixtureMatches = [];
  loading = true;


  constructor(private fixtureMatchService: GetFixturesService,
              private sheetCreationService: SheetCreationService,
              private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.getFixtures();
  }

  getFixtures() {
    this.fixtureMatchService.getAllFixtures().subscribe(
      (data) => {
      this.fixtureMatches = data.data.fixtures.map((item) => {
        const fixtureMatch = new FixtureMatchModel();
        fixtureMatch.id_fixture = item.id;
        fixtureMatch.away_name = item.away_name;
        fixtureMatch.home_name = item.home_name;
        fixtureMatch.date = item.date;
        fixtureMatch.time = item.time;
        fixtureMatch.played = '';
        return fixtureMatch;
      });
      this.loading = false;

      },
      (error) => {
        console.log(error);
      },
      () => {

      });
  }

  playMatch(match: FixtureMatchModel, winner: string) {
    const betMatch = new BetMatchModel();
    betMatch.fixture_id = match.id_fixture;
    betMatch.away_name = match.away_name;
    betMatch.home_name = match.home_name;
    betMatch.date = match.date;
    betMatch.time = match.time;
    betMatch.winner = winner;
    if (match.played === winner) {
      match.played = '';
      this.sheetCreationService.deleteMatch(betMatch);
    } else {
      match.played = winner;
      this.sheetCreationService.playMatch(betMatch);
    }
  }

  submitSheet() {this.router.navigateByUrl('/bet-sheet');
  }
}

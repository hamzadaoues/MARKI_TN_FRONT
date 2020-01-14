import {Component, OnInit} from '@angular/core';
import {GetFixturesService} from '../_services/get-fixtures.service';
import {FixtureMatchModel} from '../models/FixtureMatchModel';
import {SheetCreationService} from '../_services/SheetCreation.service';
import {BetMatchModel} from '../models/betMatchModel';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  fixtureMatches = [];

  constructor(private FixtureMatchService: GetFixturesService, private SheetCreationService: SheetCreationService) {
  }

  ngOnInit() {
    this.getFixtures();
  }

  getFixtures() {
    this.FixtureMatchService.getAllFixtures().subscribe((data) => {
      this.fixtureMatches = data.data.fixtures.map((item) => {
        let fixtureMatch = new FixtureMatchModel();
        fixtureMatch.id_fixture = item.id;
        fixtureMatch.away_name = item.away_name;
        fixtureMatch.home_name = item.home_name;
        fixtureMatch.date = item.date;
        fixtureMatch.time = item.time;
        fixtureMatch.played = false;
        return fixtureMatch;
      });
    });
  }

  playMatch(match: FixtureMatchModel, winner: string) {
    match.played = true;
    let betMatch = new BetMatchModel();
    betMatch.fixture_id = match.id_fixture;
    betMatch.away_name = match.away_name;
    betMatch.home_name = match.home_name;
    betMatch.date = match.date;
    betMatch.time = match.time;
    betMatch.winner = winner;
    this.SheetCreationService.playMatch(betMatch);
  }
}

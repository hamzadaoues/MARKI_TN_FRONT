import {Component, OnInit} from '@angular/core';
import {GetFixturesService} from '../_services/get-fixtures.service';
import {FixtureMatchModel} from '../models/FixtureMatchModel';
import {SheetCreationService} from '../_services/SheetCreation.service';
import {BetMatchModel} from '../models/betMatchModel';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
declare var $: any;
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
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    // Animate the scroll to top
    $('.scroll-to-top').on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 800);
    });
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
  submitSheet() {
    this.authService.getCurrentUser().subscribe(
      (data: any) => {
        if (data.name !== '') {
          console.log('here')
          this.router.navigateByUrl('/bet-sheet');
        }
      }, (error) => {
        console.log('error current user');
        console.log(error);
        this.router.navigateByUrl('/login');

      }
    );
  }
}

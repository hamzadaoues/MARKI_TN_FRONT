import {Component, OnInit} from '@angular/core';
import {SheetCreationService} from '../_services/SheetCreation.service';
import {BetMatchModel} from '../models/betMatchModel';
import {MatchEntityModel} from '../models/MatchEntityModel';
import {BetSheetModel} from '../models/betSheetModel';

@Component({
  selector: 'app-bet-sheet',
  templateUrl: './bet-sheet.component.html',
  styleUrls: ['./bet-sheet.component.css']
})
export class BetSheetComponent implements OnInit {

  BetMatch: BetMatchModel[];

  constructor(private SheetCreationService: SheetCreationService) {
  }

  ngOnInit() {
    this.getAllBetMatch();
  }

  getAllBetMatch() {
    this.SheetCreationService.getAllBetMatch().subscribe((data) => {
      // @ts-ignore
      this.BetMatch = data.map((item) => {
        let betMatch = new BetMatchModel();
        let match = new MatchEntityModel();
        match.fixture_id = item.fixture_id;
        match.equipe_A = item.away_name;
        match.equipe_B = item.home_name;
        betMatch.match = match;
        betMatch.date = item.date;
        betMatch.time = item.time;
        betMatch.winner = item.winner;
        return betMatch;
      });
    });
  }

  delete(match: any) {
    this.BetMatch = this.BetMatch.filter(m => m != match);
    this.SheetCreationService.deleteMatch(match);
  }

  submitSheet() {
    let sheet = new BetSheetModel();
    sheet.betMatches = this.BetMatch;
    this.SheetCreationService.sheetCreation(sheet).subscribe(response => console.log(response));
  }
}

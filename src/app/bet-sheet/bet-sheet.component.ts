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
  amount: number = 0;
  estimatedGain: number = 0;
  selectedMatches: any [];

  constructor(private sheetCreationService: SheetCreationService) {
  }

  ngOnInit() {
    this.getAllBetMatch();
  }

  getAllBetMatch() {
    this.sheetCreationService.getAllBetMatch().subscribe((data) => {
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
    this.BetMatch = this.BetMatch.filter(m => m !== match);
    this.sheetCreationService.deleteMatch(match);
  }

  submitSheet() {
    let sheet = new BetSheetModel();
    sheet.betMatches = this.BetMatch;
    this.sheetCreationService.sheetCreation(sheet).subscribe(response => console.log(response));
  }

  estimateGain() {
    const selectedmatches = JSON.parse(sessionStorage.getItem('betMatch'));
    const length = selectedmatches.length;
    console.log(length);
    if ( length >= 0 && length <= 5) {  let gain = this.amount * 0.05;
                                        this.estimatedGain = this.amount + gain;
    }
    if (length > 5 && length <= 10) { let gain = this.amount * 0.1;
                                      this.estimatedGain = this.amount + gain; }
    else {
      let gain = this.amount * 0.2;
      this.estimatedGain = this.amount + gain;
    }

  }
}

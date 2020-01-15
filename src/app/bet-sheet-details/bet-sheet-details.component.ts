import {Component, OnInit} from '@angular/core';
import {BetSheetModel} from '../models/betSheetModel';
import {SheetCreationService} from '../_services/SheetCreation.service';
import {BetMatchModel} from '../models/betMatchModel';
import {MinimizeLengthPipe} from '../minimize-length.pipe';

@Component({
  selector: 'app-bet-sheet-details',
  templateUrl: './bet-sheet-details.component.html',
  styleUrls: ['./bet-sheet-details.component.css']
})
export class BetSheetDetailsComponent implements OnInit {
  plus = false;
  betSheetHidden = true;
  betSheetList: BetSheetModel[];
  selectedSheet: BetSheetModel;
  selectedMatch: BetMatchModel;
  constructor(private SheetCreationSerice: SheetCreationService) {
  }

  ngOnInit() {
    this.getAllBetSheet();
  }

  displayOrHideDetails(match: BetMatchModel) {
    this.plus = !this.plus;
    this.betSheetHidden = !this.betSheetHidden;
    this.selectedMatch = match;
  }

  getAllBetSheet() {
    this.SheetCreationSerice.getAllSheet().subscribe(response => {
      this.betSheetList = response.map(sheet => {
        const betSheet = new BetSheetModel();
        betSheet.id = sheet.id;
        betSheet.validated = sheet.validated;
        betSheet.finished = sheet.finished;
        betSheet.wonSheet = sheet.wonSheet;
        betSheet.nbmatch =sheet.betMatches.length;
        betSheet.betMatches = sheet.betMatches.map(betMatch => {
          const match = new BetMatchModel();
          match.winner = betMatch.winner;
          match.home_name = betMatch.match.equipe_A;
          match.away_name = betMatch.match.equipe_B;
          match.finished = betMatch.finished;
          return match;
        });
        return betSheet;
      });
      console.log(this.betSheetList);
    });
  }

  selectSheet(sheet: BetSheetModel) {
    this.selectedSheet = sheet;

  }
}

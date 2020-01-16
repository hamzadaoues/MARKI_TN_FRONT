import {Component, OnInit} from '@angular/core';
import {SheetCreationService} from '../_services/SheetCreation.service';
import {BetMatchModel} from '../models/betMatchModel';
import {MatchEntityModel} from '../models/MatchEntityModel';
import {BetSheetModel} from '../models/betSheetModel';
import {NgxSpinnerService} from 'ngx-spinner';
import {stringify} from 'querystring';
declare var $: any;
@Component({
  selector: 'app-bet-sheet',
  templateUrl: './bet-sheet.component.html',
  styleUrls: ['./bet-sheet.component.css']
})
export class BetSheetComponent implements OnInit {

  betMatchs: BetMatchModel[];
  amount: number = 0;
  estimatedGain: number = 0;
  selectedMatches: any [];
  loading = true;
  existDataInSessionStorage: boolean;

  constructor(private sheetCreationService: SheetCreationService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.loading = true;
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
    this.loading = false;
    this.existDataInSessionStorage = stringify(sessionStorage.getItem('betMatch')) !== [].toString() || sessionStorage.getItem('betMatch') !== null;
    this.getAllBetMatch();
    console.log(this.existDataInSessionStorage);
  }

  getAllBetMatch() {
    this.sheetCreationService.getAllBetMatch().subscribe((data) => {
      // @ts-ignore
      this.betMatchs = data.map((item) => {
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
      this.loading = false;
    });
  }

  delete(match: any) {
    this.betMatchs = this.betMatchs.filter(m => m !== match);
    this.sheetCreationService.deleteMatch(match);
  }

  submitSheet() {
    $('#modalRegisterForm').show();
    $('.modal-backdrop').show();

    let sheet = new BetSheetModel();
    sheet.betMatches = this.betMatchs;
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

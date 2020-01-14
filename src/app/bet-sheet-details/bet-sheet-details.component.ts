import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bet-sheet-details',
  templateUrl: './bet-sheet-details.component.html',
  styleUrls: ['./bet-sheet-details.component.css']
})
export class BetSheetDetailsComponent implements OnInit {
  plus = false;
  betSheetHidden = true;

  constructor() { }

  ngOnInit() {
  }

  displayOrHideDetails() {
    this.plus = !this.plus;
    this.betSheetHidden = !this.betSheetHidden;
  }

}

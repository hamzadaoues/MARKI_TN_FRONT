import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GetPastMatchesService} from '../_services/get-past-matches.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {months} from 'moment';
export const DateFormats = {
  parse: {
    dateInput: ['YYYY-MM-DD']
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DateFormats},
  ]
})
export class ResultsComponent implements OnInit {

  champLeague = [];
  europaLeague = [];
  split = [];
  maxDate: string;
  isDataCLAvailable = false;
  isDataELAvailable = false;
  @Output() loaded = new EventEmitter<boolean>();

  constructor(private pastMatchesService: GetPastMatchesService) { }

  ngOnInit() {
    this.getCurrentDate();
    this.getChampLeaguePastMacthes( this.maxDate);
    this.getEuropaLeaguePastMatches(this.maxDate);
  }
  getChampLeaguePastMacthes(date: string) {
    this.pastMatchesService.getPastMatches(244, date, date).subscribe((data: any) => {
      data.data.match.forEach((pastMatch) => {
        this.champLeague.push(pastMatch);
      });
      this.isDataCLAvailable = true;
      console.log(this.champLeague);
    });
  }
  getEuropaLeaguePastMatches(date: string) {
    this.pastMatchesService.getPastMatches(245, date, date).subscribe((data: any) => {
      data.data.match.forEach((pastMatch) => {
        this.europaLeague.push(pastMatch);
      });
      this.isDataELAvailable = true;
      console.log(this.europaLeague);
    });
  }


  dataChange(value: string) {
    this.isDataCLAvailable = false;
    this.isDataELAvailable = false;
    this.champLeague = [];
    this.europaLeague = [];
    this.getChampLeaguePastMacthes(value);
    this.getEuropaLeaguePastMatches(value);
    console.log(value);
  }

  getCurrentDate() {
    const x = new Date();
    let y = x.getFullYear().toString();
    let m = (x.getMonth() + 1).toString();
    let d = x.getDate().toString();
    if (d.length === 1) {d = '0' + d; }
    if (m.length === 1)  {m = '0' + m; }
    this.maxDate = y + '-' + m + '-' + d;
    console.log(this.maxDate);
  }
}

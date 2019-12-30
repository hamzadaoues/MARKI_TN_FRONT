import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GetPastMatchesService} from '../_services/get-past-matches.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {months} from 'moment';
import {GetSpecificDateService} from '../_services/get-specific-date.service';
declare var $: any
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
  premierLeague = [];
  laLiga = [];
  serieA = [];
  bundesliga = [];
  ligue1 = [];
  tunisianProfessionalLeague = [];
  europaLeague = [];
  split = [];
  maxDate: string;
  isDataCLAvailable = false;
  isDataELAvailable = false;
  isDataPLAvailable = false;
  isDataLLAvailable = false;
  isDataL1Available = false;
  isDataSAAvailable = false;
  isDataTLAvailable = false;
  isDataBLAvailable = false;
  @Output() loaded = new EventEmitter<boolean>();

  constructor(private pastMatchesService: GetPastMatchesService,
              private getSpecificDateService: GetSpecificDateService) { }

  ngOnInit() {
    // Animate the scroll to top
    $('.scroll-to-top').on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 800);
    });


    this.getCurrentDate();
    this.getChampLeaguePastMacthes (this.maxDate);
    this.getEuropaLeaguePastMatches(this.maxDate);
    this.getBundesligaPastMacthes(this.maxDate);
    this.getLaLiguaPastMacthes(this.maxDate);
    this.getTunisanProfessionalLeaguePastMacthes(this.maxDate);
    this.getSerieAPastMacthes(this.maxDate);
    this.getPremierLeaguePastMacthes(this.maxDate);
    this.getLigue1PastMacthes(this.maxDate);
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

  getPremierLeaguePastMacthes(date: string) {
    this.pastMatchesService.getPastMatches(2, date, date).subscribe((data: any) => {
      data.data.match.forEach((pastMatch) => {
        this.premierLeague.push(pastMatch);
      });
      this.isDataPLAvailable = true;
      console.log('******************')
      console.log(this.premierLeague);
      console.log('******************');

    });
  }
  getLaLiguaPastMacthes(date: string) {
    this.pastMatchesService.getPastMatches(3, date, date).subscribe((data: any) => {
      data.data.match.forEach((pastMatch) => {
        this.laLiga.push(pastMatch);
      });
      this.isDataLLAvailable = true;
    });
  }
  getBundesligaPastMacthes(date: string) {
    this.pastMatchesService.getPastMatches(1, date, date).subscribe((data: any) => {
      data.data.match.forEach((pastMatch) => {
        this.bundesliga.push(pastMatch);
      });
      this.isDataBLAvailable = true;
      console.log(this.champLeague);
    });
  }

  getTunisanProfessionalLeaguePastMacthes(date: string) {
    this.pastMatchesService.getPastMatches(42, date, date).subscribe((data: any) => {
      data.data.match.forEach((pastMatch) => {
        this.tunisianProfessionalLeague.push(pastMatch);
      });
      this.isDataTLAvailable = true;
      console.log(this.tunisianProfessionalLeague);
    });
  }

  getSerieAPastMacthes(date: string) {
    this.pastMatchesService.getPastMatches(4, date, date).subscribe((data: any) => {
      data.data.match.forEach((pastMatch) => {
        this.serieA.push(pastMatch);
      });
      this.isDataSAAvailable = true;
      console.log(this.serieA);
    });
  }

  getLigue1PastMacthes(date: string) {
    this.pastMatchesService.getPastMatches(5, date, date).subscribe((data: any) => {
      data.data.match.forEach((pastMatch) => {
        this.ligue1.push(pastMatch);
      });
      this.isDataL1Available = true;
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
    this.isDataPLAvailable = false;
    this.isDataLLAvailable = false;
    this.isDataL1Available = false;
    this.isDataSAAvailable = false;
    this.isDataTLAvailable = false;
    this.isDataBLAvailable = false;
    this.champLeague = [];
    this.premierLeague = [];
    this.laLiga = [];
    this.serieA = [];
    this.bundesliga = [];
    this.ligue1 = [];
    this.tunisianProfessionalLeague = [];
    this.europaLeague = [];
    this.getChampLeaguePastMacthes (value);
    this.getEuropaLeaguePastMatches(value);
    this.getBundesligaPastMacthes(value);
    this.getLaLiguaPastMacthes(value);
    this.getTunisanProfessionalLeaguePastMacthes(value);
    this.getSerieAPastMacthes(value);
    this.getPremierLeaguePastMacthes(value);
    this.getLigue1PastMacthes(value);
    console.log(value);
  }

  getCurrentDate() {
    this.maxDate = this.getSpecificDateService.getCurrentDate();
  }
}

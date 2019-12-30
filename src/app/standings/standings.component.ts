import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GetStandingsService} from '../_services/get-standings.service';
import {ActivatedRoute} from '@angular/router';
declare var $: any
@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  standings = [];
  split = [];
  competitionId: number;
  isDataAvailable = false;
  competitionName: string;
  countryName: string;
  @Output() loaded = new EventEmitter<boolean>();

  constructor(private standingsService: GetStandingsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Animate the scroll to top
    $('.scroll-to-top').on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 800);
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.competitionId = Number(params.get('competitionId'));
      console.log(this.competitionId);
    });
    this.getCompetitionName(this.competitionId);
    this.standingsService.getStandings(this.competitionId).subscribe((data: any) => {
      data.data.table.forEach((standing) => {
        this.standings.push(standing);
      });
      this.loaded.emit(true);
      console.log(this.standings);
      this.isDataAvailable = true;
    });
  }

  getCompetitionName(competitionId: number) {
   switch (competitionId) {
     case Number(2) : {
       this.competitionName = 'Premier League';
       this.countryName = 'england';
       break;
     }
     case 1 : {
       this.competitionName = 'Bundesliga';
       this.countryName = 'germany';

       break;
     }
     case 3 : {
       this.competitionName = 'LaLiga Santander';
       this.countryName = 'spain';

       break;
     }
     case 4 : {
       this.competitionName = 'Serie A';
       this.countryName = 'italy';

       break;
     }
     case 42 : {
       this.competitionName = 'Tunisian Professional League 1';
       this.countryName = 'tunisia';

       break;
     }
     case 5 : {
       this.competitionName = 'Ligue 1';
       this.countryName = 'france';

       break;
     }
     default: {break; }
   }
   }

}

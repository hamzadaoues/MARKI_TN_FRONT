import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GetStandingsService} from '../_services/get-standings.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  standings = [];
  split = [];
  leagueId: number;
  isDataAvailable = false;
  league: string;
  @Output() loaded = new EventEmitter<boolean>();

  constructor(private standingsService: GetStandingsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.leagueId = Number(params.get('leagueId'));
      console.log(this.leagueId);
    });
    this.getLeagueName(this.leagueId);
    this.standingsService.getStandings(this.leagueId, 2).subscribe((data: any) => {
      data.data.table.forEach((standing) => {
        this.standings.push(standing);
      });
      this.loaded.emit(true);
      console.log(this.standings);
      this.isDataAvailable = true;
    });
  }

  getLeagueName(leagueId: number) {
   switch (leagueId) {
     case Number(84) : {
       this.league = 'Champions League';
       break;
     }
     case 88 : {
       this.league = 'Europa League';
       break;
     }
     default: {break; }
   }
   }

}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GetStandingsService} from '../_services/get-standings.service';
import {ActivatedRoute} from '@angular/router';
import {GetPastMatchesService} from '../_services/get-past-matches.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  pastMacthes = [];
  split = [];
  isDataAvailable = false;
  league: string;
  @Output() loaded = new EventEmitter<boolean>();

  constructor(private pastMatchesService: GetPastMatchesService) { }

  ngOnInit() {
    this.pastMatchesService.getPastMatches().subscribe((data: any) => {
      data.data.match.forEach((pastMatch) => {
        this.pastMacthes.push(pastMatch);
      });
      this.loaded.emit(true);
      console.log(this.pastMacthes);
      this.isDataAvailable = true;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {GetLiveMatchesService} from '../../_services/get-live-matches.service';
import {HttpClient} from '@angular/common/http';
import {GetMatchEventsService} from '../../_services/get-match-events.service';
import {GetSpecificDateService} from '../../_services/get-specific-date.service';
import {GetPastMatchesService} from '../../_services/get-past-matches.service';

declare var $: any
@Component({
  selector: 'app-live-news',
  templateUrl: './live-news.component.html',
  styleUrls: ['./live-news.component.css']
})
export class LiveNewsComponent implements OnInit {
  private liveMatchesIds = [];
  private yesterdayMatchesIds = [];
  private liveMatchesEvents = [];
  private yesterdayMatchesEvents = [];
  private currentDate: string;
  private isLiveMatchsIdsAvailable: boolean;
  private isYesretrdayMatchsIdsAvailable: boolean;

  constructor(private liveMatchesService: GetLiveMatchesService,
              private matchEventsService: GetMatchEventsService,
              private getSpecificDateService: GetSpecificDateService,
              private pastMatchesService: GetPastMatchesService
  ) { }

  ngOnInit() {
    // Animate the scroll to top
    this.initilizeScrollToTop();
    this.getYestardayDate();
    this.getLiveMatchesIds();
    this.getYesterdayMatchesIds(this.getYestardayDate());
  }

  // chooseMatchsIdsToPutInEvents() {
  //   this.isLiveMatchsIdsAvailable = false;
  //   this.isYesretrdayMatchsIdsAvailable = false;
  //   this.getLiveMatchesIds();
  //   if (this.isLiveMatchsIdsAvailable && this.liveMatchesIds.length < 3) {
  //     this.getYesterdayMatchesIds(this.getYestardayDate());
  //   }
  // }
  getLiveMatchesIds() {
    // get live matches ids
    this.liveMatchesService.getLiveScores().subscribe(
      (data: any) => {
        data.data.match.forEach((match) => {
          this.liveMatchesIds.push(match.id);
          console.log('*****');
          console.log(data);
          console.log('*****');
        });
      }, (error: any) => {
        console.log(error);
      }, () => {
        this.isLiveMatchsIdsAvailable = true;
      });
  }
  getYesterdayMatchesIds(date: string) {
    for (let i = 1; i < 6; i++) {
      this.pastMatchesService.getPastMatches(i, date, date).subscribe(
        (data: any) => {
        data.data.match.forEach((pastMatch) => {
          this.yesterdayMatchesIds.push(pastMatch.id);
        });
      }, (error) => {
          console.log(error);
        }, () => {
          this.isYesretrdayMatchsIdsAvailable = true;
        });
    }
    console.log('yesterday matches ids ');
    console.log(this.yesterdayMatchesIds);
  }
  getLiveMatchesEvents(liveMatchesIds: number) {
    this.liveMatchesIds.forEach((matchId) => {
      this.matchEventsService.getLiveEvents(matchId).subscribe(
        (data: any) => {
          this.liveMatchesEvents.push(data);
        });
    });
  }
  getYesterdayMatchesEvents(yesterdayMatchesIds: number) {
    this.yesterdayMatchesIds.forEach((matchId) => {
      this.matchEventsService.getLiveEvents(matchId).subscribe(
        (data: any) => {
          this.yesterdayMatchesEvents.push(data);
        });
    });
  }
  initilizeScrollToTop() {
    $('.scroll-to-top').on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 800);
    });
  }
  getCurrentDate() {
    this.currentDate = this.getSpecificDateService.getCurrentDate();
  }
  getYestardayDate() {
    return (this.getSpecificDateService.getYesterdayDate());
  }
}

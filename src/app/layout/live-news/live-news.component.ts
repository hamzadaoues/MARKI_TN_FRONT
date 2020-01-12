import { Component, OnInit } from '@angular/core';
import {GetLiveMatchesService} from '../../_services/get-live-matches.service';
import {HttpClient} from '@angular/common/http';
import {GetMatchEventsService} from '../../_services/get-match-events.service';
import {GetSpecificDateService} from '../../_services/get-specific-date.service';
import {GetPastMatchesService} from '../../_services/get-past-matches.service';
import {GenerateRandomNumberService} from '../../_services/generate-random-number.service';

declare var $: any;
@Component({
  selector: 'app-live-news',
  templateUrl: './live-news.component.html',
  styleUrls: ['./live-news.component.css']
})
export class LiveNewsComponent implements OnInit {
  private liveMatchesIds = [];
  private threeEventsToDisplay = [];
  private allMatchesEvents = [];
  private eventsToDisplay = [];
  private yesterdayMatchesIds = [];
  private liveMatchesEvents = [];
  private yesterdayMatchesEvents = [];
  private currentDate: string;
  private isLiveEventsAvailable = false;
  private noLiveMatchAvailable = false;
  private isYesretrdayMatchsIdsAvailable: boolean;

  constructor(private liveMatchesService: GetLiveMatchesService,
              private matchEventsService: GetMatchEventsService,
              private getSpecificDateService: GetSpecificDateService,
              private pastMatchesService: GetPastMatchesService,
              private generateRandomNumberService: GenerateRandomNumberService
  ) { }

  ngOnInit() {
    // Animate the scroll to top
    $('.scroll-to-top').on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 800);
    });

    this.isLiveEventsAvailable = false;
    this.getAllMatchesLiveEvents();
  }
  getAllMatchesLiveEvents() {
    // get live matches ids
    this.liveMatchesService.getLiveScores().subscribe(
      (data: any) => {
        data.data.match.forEach((match) => {
          this.liveMatchesIds.push(match.id);

        });
      }, (error: any) => {
        console.log('error matchs id')
        console.log(error);
      }, () => {
        // Once i have all live matchs id , i will check their events
        const numberOfLiveMatches = this.liveMatchesIds.length;
        if (numberOfLiveMatches !== 0) {
        let i = 0;
        this.liveMatchesIds.forEach((matchId) => {
            this.matchEventsService.getLiveEvents(matchId).subscribe(
              (matchEvent: any) => {
                  this.allMatchesEvents.push(matchEvent);
              },
              (error) => {
                console.log('error events');
                console.log(error);
              },
          () => {
            i++;

            // If we have all matches events

            if (i === numberOfLiveMatches) {
                  console.log('all matches events ');
                  console.log(this.allMatchesEvents);
                  // If we have more than 3 matches , we choose the 3 first matches
                  this.allMatchesEvents.forEach(
                    (match) => {
                      match.data.event.forEach((matchEvent) => {
                        this.eventsToDisplay.push(matchEvent);
                      });
                    }
                  );
                  for (let j = 0; j < 3 ; j++) {
                    this.threeEventsToDisplay.push(this.eventsToDisplay[j]);
                  }
                  console.log('events to display :');
                  console.log(this.eventsToDisplay);
                  this.isLiveEventsAvailable = true;
                }
          });
        });
        } else {
          this.isLiveEventsAvailable = true;
          this.noLiveMatchAvailable = true;
        }
        console.log('No live Match availables');
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
}

import { Component, OnInit } from '@angular/core';
declare var $: any
@Component({
  selector: 'app-in-play',
  templateUrl: './in-play.component.html',
  styleUrls: ['./in-play.component.css']
})
export class InPlayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Animate the scroll to top
    $('.scroll-to-top').on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 800);
    });
  }

}

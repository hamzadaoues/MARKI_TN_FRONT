import { Component, OnInit } from '@angular/core';
declare var $: any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loaded: boolean;

  constructor() { }

  ngOnInit() {
    // Animate the scroll to top
    $('.scroll-to-top').on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 800);
    });

  }

}

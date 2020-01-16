import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() pageName;
  currUser = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(
      (data: any) => {
         this.currUser = data.name;
         console.log(this.currUser);
      }, (error) => {
          console.log('error current user');
          console.log(error);
      }
    );
  }

  logout() {
    this.authService.logOut();
  }
}

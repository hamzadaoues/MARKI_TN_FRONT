import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BetMatchModel} from '../models/betMatchModel';
import {Observable} from 'rxjs';
import {BetSheetModel} from '../models/betSheetModel';

@Injectable({
  providedIn: 'root'
})
export class SheetCreationService {

  constructor(private http: HttpClient) {
  }

  URL = 'http://localhost:8084/betsheet';

  // cette methode ajoute le match à jouer dans le localstorage pour le trouver à la creation de la BetSheet
  playMatch(betMatch: BetMatchModel) {
    if (localStorage.getItem('betMatch') === null) {
      let betMatchs = [];
      localStorage.setItem('betMatch', JSON.stringify(betMatchs));
    }
    let betMatchs = JSON.parse(localStorage.getItem('betMatch'));
    betMatchs.push(betMatch);
    localStorage.setItem('betMatch', JSON.stringify(betMatchs));
  }

  getAllBetMatch() {
    return new Observable(observer => {
      observer.next(JSON.parse(localStorage.getItem('betMatch')));

    });


  }

  deleteMatch(betMatch: BetMatchModel) {
    let betMatchs = JSON.parse(localStorage.getItem('betMatch'));
    betMatchs = betMatchs.filter(m => m.fixture_id != betMatch.match.fixture_id);
    console.log(betMatchs);
    localStorage.setItem('betMatch', JSON.stringify(betMatchs));
  }

  sheetCreation(sheet: BetSheetModel) {
    return this.http.post(this.URL, sheet);
  }


}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BetMatchModel} from '../models/betMatchModel';
import {Observable} from 'rxjs';
import {BetSheetModel} from '../models/betSheetModel';
import {BASE_API, BET_SHEET} from '../_globals/vars';

@Injectable({
  providedIn: 'root'
})
export class SheetCreationService {

  constructor(private http: HttpClient) {
  }
  // cette methode ajoute le match à jouer dans le localstorage pour le trouver à la creation de la BetSheet
  playMatch(betMatch: BetMatchModel) {
    // Creates a betMatch item if not exists in Session Storage
    if (sessionStorage.getItem('betMatch') === null) {
      let betMatchs =  [];
      sessionStorage.setItem('betMatch', JSON.stringify(betMatchs));
    }
    // Get BetMatch item if it exists to add new element
    let betMatchs = JSON.parse(sessionStorage.getItem('betMatch'));
    // Check if we made i decision to that match , if yes we will update that decision
    betMatchs = betMatchs.filter(m => m.fixture_id !== betMatch.fixture_id);
    betMatchs.push(betMatch);
    sessionStorage.setItem('betMatch', JSON.stringify(betMatchs));
  }

  getAllBetMatch() {
    return new Observable(observer => {
      observer.next(JSON.parse(sessionStorage.getItem('betMatch')));

    });


  }

  deleteMatch(betMatch: BetMatchModel) {
    let betMatchs = JSON.parse(sessionStorage.getItem('betMatch'));
    betMatchs = betMatchs.filter(m => m.fixture_id !== betMatch.fixture_id);
    sessionStorage.setItem('betMatch', JSON.stringify(betMatchs));

  }

  sheetCreation(sheet: BetSheetModel) {
    return this.http.post(BASE_API + BET_SHEET, sheet);
  }


}

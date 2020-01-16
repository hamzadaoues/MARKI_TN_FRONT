import {BetMatchModel} from './betMatchModel';

export class BetSheetModel {
  betMatches: BetMatchModel[];
  validated = 'false';
  finished = 'false';
  state: string;
  wonSheet = 'false';
  id: string;
  nbmatch: number;
}

import {BetMatchModel} from './betMatchModel';

export class BetSheetModel {
  betMatches: BetMatchModel[];
  validated = 'false';
  finished = 'false';
  wonSheet = 'false';
  id: string;
  nbmatch: number;
}

import {MatchEntityModel} from './MatchEntityModel';

export class BetMatchModel {
  id: string;
  winner: string;
  match: MatchEntityModel;
  fixture_id: string;
  date: string;
  time: string;
  home_name: string;
  away_name: string;
}

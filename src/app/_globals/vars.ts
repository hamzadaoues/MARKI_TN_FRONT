import {environment} from '../../environments/environment';

const ENABLE_CROSS_ORIGIN_URL = 'https://cors-anywhere.herokuapp.com/';
export const API_KEY = 'zmN7ilILwiy2RqU6';
export const API_SECRET = 'KaTyAJlUmEeVIBXhYKpg672DpAGh1AnL';
export const LIVE_SCORES_URL =  ENABLE_CROSS_ORIGIN_URL + 'livescore-api.com/api-client/scores/live.json';
export const STANDINGS_URL = ENABLE_CROSS_ORIGIN_URL + 'livescore-api.com/api-client/leagues/table.json';
export const PAST_MATCHES = ENABLE_CROSS_ORIGIN_URL + 'livescore-api.com/api-client/scores/history.json';
export const LEAGUE_TEAMS = ENABLE_CROSS_ORIGIN_URL + 'livescore-api.com/api-client/teams/list.json';
export const LIVE_EVENTS = ENABLE_CROSS_ORIGIN_URL + 'livescore-api.com/api-client/scores/events.json';


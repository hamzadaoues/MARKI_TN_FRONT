import {environment} from '../../environments/environment';

const ENABLE_CROSS_ORIGIN_URL = 'https://cors-anywhere.herokuapp.com/';
export const BASE_API = 'http://localhost:8084/';
export const PAYMENT = 'payment/charge';
export const BET_SHEET = 'betsheet';
export const API_KEY = 'NNbH99u5ssFmM9BX';
export const API_SECRET = 'hwFZ6Uew3v1ACLypzJ7ISBNk3tGQCiNU';
export const LIVE_SCORES_URL =  ENABLE_CROSS_ORIGIN_URL + 'livescore-api.com/api-client/scores/live.json';
export const STANDINGS_URL = ENABLE_CROSS_ORIGIN_URL + 'livescore-api.com/api-client/leagues/table.json';
export const PAST_MATCHES = ENABLE_CROSS_ORIGIN_URL + 'livescore-api.com/api-client/scores/history.json';
export const LEAGUE_TEAMS = ENABLE_CROSS_ORIGIN_URL + 'livescore-api.com/api-client/teams/list.json'
export const FEXTURES_MATCH_URL =  ENABLE_CROSS_ORIGIN_URL + 'livescore-api.com/api-client/fixtures/matches.json';
export const LIVE_EVENTS = ENABLE_CROSS_ORIGIN_URL + 'livescore-api.com/api-client/scores/events.json';
export const CURRENT_USER = 'auth/currentUser';

const BACKEND_ENDPOINT = process.env.REACT_APP_API_BASE_URL;
//data.headers.x-rate-limit-used
export const ALL_MATCHES = BACKEND_ENDPOINT + "/api/allmatches";

export const DATABASE_TOURNAMENTS = BACKEND_ENDPOINT + "/database/tournaments";

export const DATABASE_SEARCH_TEAM = BACKEND_ENDPOINT + "/database/searchteam/:letters";

export const LEAGUE_INFO = BACKEND_ENDPOINT + "/api/tournamentmatches/:id";

export const TEAM_INFO = BACKEND_ENDPOINT + "/api/teaminfo/:id";

export const PLAYER_INFO = BACKEND_ENDPOINT + "/api/playerinfo/:name";

export const PLAYER_SCORE = BACKEND_ENDPOINT + "/api/teamscore/:id";

export const HLTV_RANKING = BACKEND_ENDPOINT + "/api/hltvranking";

export const TIME_LINE = BACKEND_ENDPOINT + "/api/timeline";

export const NEWS = BACKEND_ENDPOINT + "/api/news";
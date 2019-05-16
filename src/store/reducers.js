import {
  FETCH_USERDATA, FETCH_COMPETITION,
} from './actions';

import { comptest } from './MOCKdata';

const EmptyCompetition = {
            "key": "empty key",
            "name": "empty name",
            "version": "1.0",
            "GLOBALID": 0,
            "days": [],
            "arenas": [],
            "events": [],
            "dxa": [],
            "axe": []
        };

// state for auth
const initialstate = {
  competition: comptest,
  colorCount: 0, //Antal färger som är använda.
  painting: [], // Iden är att det ska vara en lista av klass/colorid.
}

function rootReducer (state = initialstate, action) {
  console.log("call to rootReducer "+state.competition.key);

  switch (action.type) {
    case FETCH_USERDATA:
      return Object.assign({}, state, {
        isFetching: false,
        userprofile: action.data.username,
      })

      case FETCH_COMPETITION:
        return Object.assign({}, state, {
          accounts: action.data.competition,
        })

    default:
      return state;
  }
}

export default rootReducer;

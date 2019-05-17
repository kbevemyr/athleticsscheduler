import {
  FETCH_USERDATA, FETCH_COMPETITION, SET_NEWCOLOR,
} from './actions';

import { COLORS } from '../misc';

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

      case SET_NEWCOLOR:
        return Object.assign({}, state, {
          painting: [...state.painting, {id: action.id, color: COLORS[state.colorCount]}],
          colorCount: state.colorCount+1, // peka ut nästa lediga färg
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

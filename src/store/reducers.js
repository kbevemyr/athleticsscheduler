import {
  FETCH_USERDATA, FETCH_COMPETITION, SET_NEWCOLOR, SAVE_COMPETITION,
  UPDATE_EVENT, SET_ACTIVE
} from './actions';

import { COLORS, defaultColor } from '../misc';
import { healthCheckSchema } from '../misc';

import { localComps } from './MOCKdata';

const EmptyCompetition = {
            "key": "empty key",
            "name": "empty name",
            "version": "1.0",
            "days": [],
            "arenas": [],
            "events": [],
            "dxa": [],
            "axe": []
        };

// state for auth
const initialstate = {
  competition: localComps[2], //EmptyCompetition, //comptest,
  colorCount: 0, //Antal färger som är använda.
  painting: [], // Iden är att det ska vara en lista av klass/colorid.
  activeID: -1,
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
        var newColor = defaultColor;
        if (state.colorCount < COLORS.length) {
          newColor = COLORS[state.colorCount];
        } else {
          console.log("Out of colors, used defaultColor for "+action.id);
        }
        return Object.assign({}, state, {
          painting: [...state.painting, {id: action.id, color: newColor}],
          colorCount: state.colorCount+1, // peka ut nästa lediga färg
        })

      case FETCH_COMPETITION:
        healthCheckSchema(action.data.events);
        return Object.assign({}, state, {
          competition: action.data,
          colorCount: 0,
          painting: [],
        })

      case SAVE_COMPETITION:
        return Object.assign({}, state, {
          saved: action.timestamp,
        })

      case UPDATE_EVENT:
        return Object.assign({}, state, {
          events: state.competition.events.map((x) => {if(x.id === action.event.id) {return action.event;} else {return x;}}),
          activeID: -1,
        })

      case SET_ACTIVE:
        return Object.assign({}, state, {
          activeID: action.id
        })

    default:
      return state;
  }
}

export default rootReducer;

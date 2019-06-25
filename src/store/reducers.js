import {
  FETCH_USERDATA, FETCH_COMPETITION, SET_NEWCOLOR, SAVE_COMPETITION,
  UPDATE_EVENT, SET_ACTIVE_EVENT, SET_ACTIVE_CLASS
} from './actions';

import { COLORS, defaultColor } from '../misc';
import { healthCheckSchema } from '../misc';
import { getClassEventsID } from '../misc';

import { localComps } from './MOCKdata';

/*
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
        */

// state for auth
const initialstate = {
  competition: localComps[2], //EmptyCompetition, //comptest,
  colorCount: 0, //Antal färger som är använda.
  painting: [], // Iden är att det ska vara en lista av klass/colorid.
  activeID: {},
  activeC: "",
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
        var updatedEvents = state.competition.events.map((x) => {if(x.id === action.event.id) {return action.event;} else {return x;}});
        return Object.assign({}, state, {
          competition: Object.assign({}, state.competition, {events: updatedEvents}),
        })

      case SET_ACTIVE_EVENT:
        var status = state.activeID[action.id];
        if (status == null) {
          status = true;
        } else {
          status = !status;
        }
        var updatedActiveID = Object.assign({}, state.activeID);
        updatedActiveID[action.id] = status;
        return Object.assign({}, state, {
          activeID: updatedActiveID,
        })

      case SET_ACTIVE_CLASS:
      //TOdo: find all events for a class and add their id to activeID
        var es = getClassEventsID(state.competition, action.c);
        console.log("es ");console.dir(es);
        var newActiveID = Object.assign({}, state.activeID);
        for(let e of es) {
          setActiveID(newActiveID, e);
        }
        return Object.assign({}, state, {
          activeC: action.c,
          activeID: newActiveID,
        })

    default:
      return state;
  }
}

// helpers
function setActiveID(aid, id) {
  console.log("setActiveID");
  console.dir(aid);
  var status = aid[id];
  if (status == null) {
    status = true;
  } else {
    status = !status;
  }
  aid[id] = status;
  console.log(aid);
}

export default rootReducer;

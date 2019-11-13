import {
  FETCH_USERDATA, SET_COMPETITION, SET_NEWCOLOR, SAVE_COMPETITION,
  UPDATE_EVENT, SET_ACTIVE_EVENT, SET_ACTIVE_CLASS, UPDATE_OVERLAP,
  UPDATE_SETTINGS, ADD_NAME, DELETE_NAME, CHANGE_NAME,
} from './actions';

import { COLORS, defaultColor } from '../misc';
import { getClassEventsID } from '../misc';
import { newID } from '../misc';
import { EmptyCompetition } from '../misc';


// state for auth
const initialstate = {
  competition: EmptyCompetition, //comptest, //localComps[2],
  colorCount: 0, //Antal färger som är använda för att identifera en klass.
  painting: [], // Iden är att det ska vara en lista av klass/colorid.
  activeID: {},
  activeC: "",
  overlap: {}, // Visar vilka kollisioner man vill se i översikten.
  //parking: [],
}

function rootReducer (state = initialstate, action) {
  //console.log("call to rootReducer "+state.competition.key);

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

      case SET_COMPETITION:
        return Object.assign({}, state, {
          competition: action.data,
          colorCount: 0,
          painting: [],
          activeID: {},
          activeC: "",
          overlap: {},
        })

      case SAVE_COMPETITION:
        return Object.assign({}, state, {
          saved: action.timestamp,
        })

      case UPDATE_SETTINGS:
        return Object.assign({}, state, {
          competition: Object.assign({}, state.competition, action.settings),
        })

      case ADD_NAME:
        let newName = [{id: newID(), name: action.name}];
        let updatedNamesValue = state.competition[action.nametype].concat(newName);
        let updatedNamesObj = {[action.nametype]: updatedNamesValue};
        return Object.assign({}, state, {
          competition: Object.assign({}, state.competition, updatedNamesObj),
        });

      case DELETE_NAME:
        let names = state.competition[action.nametype];
        let redNamesValue = names.filter(x => x.id !== action.id);
        let redNamesObj = {[action.nametype]: redNamesValue};
        return Object.assign({}, state, {
          competition: Object.assign({}, state.competition, redNamesObj),
        });

      case CHANGE_NAME:
        let names2 = state.competition[action.nametype];
        let redNames2Value = names2.map(x => x.id !== action.id ? x : {id: x.id, name: action.name});
        let redNames2Obj = {[action.nametype]: redNames2Value};
        return Object.assign({}, state, {
          competition: Object.assign({}, state.competition, redNames2Obj),
        });

      case UPDATE_EVENT:
        var updatedEvents = state.competition.events.map((x) => {if(x.id === action.event.id) {return action.event;} else {return x;}});
        if(action.event.id === 9999) {
          var newEvent = action.event;
          newEvent.id = newID(action.event);
          updatedEvents.push(action.event);
        }
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
      // find all events for a class and add their id to activeID
        var es = getClassEventsID(state.competition, action.c);
        console.log("es ");console.dir(es);

        var newActiveID = {};
        var newActiveC = "";
        // if class is active then unset class else add active ids
        if (state.activeC !== action.c) {
          for(let e of es) {
            setID(newActiveID, e);
          }
          newActiveC = action.c;
        }

        return Object.assign({}, state, {
          activeC: newActiveC,
          activeID: newActiveID,
        })

      case UPDATE_OVERLAP:
        var updatedOverlap = {};
        var cObj = state.overlap[action.collision.key];
        if (cObj == null) {
          // id is not in overlap
          status = true;
        } else {
          status = !cObj.p;
        }
        updatedOverlap = Object.assign({}, state.overlap);
        updatedOverlap[action.collision.key] = {p: status, o: action.collision.value};
        return Object.assign({}, state, {
          overlap: updatedOverlap,
        })

    default:
      return state;
  }
}

// helpers
function setID(aid, id) {
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

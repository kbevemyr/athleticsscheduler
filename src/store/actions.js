import { serverGet, serverPost } from './support.js';
import { localComps } from './MOCKdata';

export const FETCH_USERDATA = 'FETCH_USERDATA';
export const FETCH_COMPETITION = 'FETCH_COMPETITION';
export const SET_NEWCOLOR = 'SET_NEWCOLOR';
export const SAVE_COMPETITION = 'SAVE_COMPETITION';

export const UPDATE_EVENT = 'UPDATE_EVENT';
export const SET_ACTIVE_EVENT = 'SET_ACTIVE_EVENT';
export const SET_ACTIVE_CLASS = 'SET_ACTIVE_CLASS';
export const UPDATE_OVERLAP = 'UPDATE_OVERLAP';


// Action Creators - Functions that create actions

/*
function gotUserdata(data) {
  return {
    type: FETCH_USERDATA,
    data
  }
}
*/

function gotCompetition(data) {
  return {
    type: FETCH_COMPETITION,
    data
  }
}

function savedCompetitionData(timestamp) {
  return {
    type: SAVE_COMPETITION,
    timestamp,
  }
}

export function setColor(id) {
  return {
    type: SET_NEWCOLOR,
    id: id,
  }
}

export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    event,
  }
}

export function setActiveEvent(id) {
  return {
    type: SET_ACTIVE_EVENT,
    id,
  }
}

export function setActiveClass(c) {
  return {
    type: SET_ACTIVE_CLASS,
    c,
  }
}

export function setOverlap(collision) {
  return {
    type: UPDATE_OVERLAP,
    collision,
  }
}


// Backend functions calls

/*

function getClassColor(id) {
  if (state.painting == null) {
    this.props.getColor(id);
  }
  return state.painting[id];
}

*/

export function saveCompetitionData (key, comp){
  console.log("saveCompetitionData. with key "+key);

  return dispatch => {
    serverPost("put?key="+key, comp).then(
      (res) => {
        if(res.status === "error") {
          console.log("saveCompetitionData. failed "+res.reason);
        }
        else {
          console.log("saveCompetitionData. OK "+key);
          dispatch(savedCompetitionData(new Date()));
        }
      }
    )
  }
}

export function getCompetitionData (key) {
  console.log("actions. getCompetitionData "+key);
  var index = -1;
  var data = [];
  let args = {
    key: key,
  };

  if (key === "2017") {
    index = 0;
  } else if (key === "2018") {
    index = 1;
  } else if (key === "2019") {
    index = 2;
  } else { //goto server
    index = -1;
  }

  if(index > -1) {
    data = dispatch => {
      console.log("getCompetitionData. local ");
      dispatch(gotCompetition(localComps[index]));
    }
  } else {
    data = dispatch => {
      serverGet("get", args).then(
        (res) => {
          if(res.status === "error") {
            console.log("getCompetitionData. failed: "+res.reason);
          }
          else {
            console.log("getCompetitionData. OK "+JSON.stringify(res));
            dispatch(gotCompetition(res));
          }
        }
      )
    };
  }

  return data;
}

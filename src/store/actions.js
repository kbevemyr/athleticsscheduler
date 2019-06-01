import { serverLogin, serverGet, serverPost } from './support.js';
import { localComps } from './MOCKdata';

export const FETCH_USERDATA = 'FETCH_USERDATA';
export const FETCH_COMPETITION = 'FETCH_COMPETITION';
export const SET_NEWCOLOR = 'SET_NEWCOLOR';
export const SAVE_COMPETITION = 'SAVE_COMPETITION';

export const UPDATE_EVENT = 'UPDATE_EVENT'


// Action Creators - Functions that create actions

function gotUserdata(data) {
  return {
    type: FETCH_USERDATA,
    data
  }
}

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

  let args = {
    key: key,
  };

  let local2017Data = dispatch => {
    console.log("getCompetitionData. local ");
    dispatch(gotCompetition(localComps[0]));
  };

  let local2018Data = dispatch => {
    console.log("getCompetitionData. local ");
    dispatch(gotCompetition(localComps[1]));
  };

  let local2019Data = dispatch => {
    console.log("getCompetitionData. local ");
    dispatch(gotCompetition(localComps[2]));
  };

  let serverData = dispatch => {
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

  if (key === "2017") {
    return local2017Data;
  } else if (key === "2018") {
    return local2018Data;
  } else if (key === "2019") {
    return local2019Data;
  } else {
    return serverData;
  }
}

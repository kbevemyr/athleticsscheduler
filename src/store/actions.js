import { serverLogin, serverGet, serverPost } from './support.js';

export const FETCH_USERDATA = 'FETCH_USERDATA';
export const FETCH_COMPETITION = 'FETCH_COMPETITION';
export const SET_NEWCOLOR = 'SET_NEWCOLOR';


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

export function setColor(id) {
  return {
    type: SET_NEWCOLOR,
    id: id,
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

export function getCompetitionData (cid) {
  console.log("actions. getCompetitionData "+JSON.stringify(cid));

  let args = {
    key: cid,
  };

  return dispatch => {
    serverGet("get", args).then(
      (res) => {
        if(res.status === "error") {
          console.log("getCompetitionData. failed: "+res.reason);
        }
        else {
          console.log("getCompetitionData. OK ");
          dispatch(gotCompetition(JSON.parse(res.body)));
        }
      }
    )
  }
}

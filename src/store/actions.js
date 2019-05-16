import { serverLogin, serverGet, serverPost } from './support.js';

export const FETCH_USERDATA = 'FETCH_USERDATA';
export const FETCH_COMPETITION = 'FETCH_COMPETITION';


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


// Backend functions calls

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

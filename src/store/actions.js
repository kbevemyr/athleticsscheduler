import { serverGet, serverPost } from './support.js';
import { EmptyCompetition } from '../misc';
import { getLocalData } from './MOCKdata';
import { getTemplateData } from './templates';

export const FETCH_USERDATA = 'FETCH_USERDATA';

export const SET_KEYS = 'SET_KEYS';
export const SET_COMPETITION = 'SET_COMPETITION';
export const SET_NEWCOLOR = 'SET_NEWCOLOR';
export const SAVE_COMPETITION = 'SAVE_COMPETITION';

export const UPDATE_EVENT = 'UPDATE_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const SET_ACTIVE_DAY = 'SET_ACTIVE_DAY';
export const SET_ACTIVE_EVENT = 'SET_ACTIVE_EVENT';
export const SET_ACTIVE_CLASS = 'SET_ACTIVE_CLASS';
export const UPDATE_COLLISION = 'UPDATE_COLLISION';

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const ADD_NAME = 'ADD_NAME';
export const DELETE_NAME = 'DELETE_NAME';
export const CHANGE_NAME = 'CHANGE_NAME';


// Action Creators - Functions that create actions


function gotKeys(keys) {
  return {
    type: SET_KEYS,
    keys
  }
}

function gotCompetition(data) {
  return {
    type: SET_COMPETITION,
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

export function deleteEvent(id) {
  return {
    type: REMOVE_EVENT,
    id,
  }
}

export function setActiveDay(id) {
  return {
    type: SET_ACTIVE_DAY,
    id,
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

export function setCollision(collision) {
  return {
    type: UPDATE_COLLISION,
    collision,
  }
}

export function addName(name, nametype) {
  return {
    type: ADD_NAME,
    name,
    nametype,
  }
}

export function deleteName(id, nametype) {
  return {
    type: DELETE_NAME,
    id,
    nametype,
  }
}

export function changeName(id, name, nametype) {
  return {
    type: CHANGE_NAME,
    id,
    name,
    nametype,
  }
}

export function updateSettings(settings) {
  return {
    type: UPDATE_SETTINGS,
    settings,
  }
}



// Backend functions calls

/*
  config section for server access
*/
const urlBase = "//gt16.se";
const urlProtocol = window.location.protocol;

export function loginUser(username, passwd) {
  console.log("loginUser: "+username);
  const adr = urlProtocol + urlBase + "/idrott/login";
  const url=adr+"?user="+username+"&password="+passwd;
  return fetch(url)
    .then(response => response.json());
}

export function newCompetitionData () {
  return dispatch => {
    console.log("newCompetitionData");
    dispatch(gotCompetition(EmptyCompetition));
  }
}

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

export function getCompetitionData (datastore, key) {
  console.log("actions. getCompetitionData "+key);
  let args = {
    key: key,
  };

  switch (datastore) {
    case 'local':
      return dispatch => {dispatch(gotCompetition(getLocalData(key)))};
    case 'template':
      return dispatch => {dispatch(gotCompetition(getTemplateData(key)))};
    case 'server':
      return dispatch => {
        serverGet("get", args).then(
          (res) => {
            if(res.status === "error") {
              console.log("getCompetitionData. failed: "+res.reason);
            }
            else {
              console.log("getCompetitionData. OK "+JSON.stringify(res));
              dispatch(gotCompetition(res.value));
            }
          }
        )
      }
    }
}

export function getKeys() {
  let data = dispatch => {
    serverGet("get_keys", {}).then(
      (res) => {
        if(res.status === "error") {
          console.log("getKeys. failed: "+res.reason);
        }
        else {
          console.log("getKeys. OK "+JSON.stringify(res));
          dispatch(gotKeys(res.value));
        }
      },
      (err) => {
        console.log("getKeys failed: ");
        console.log(err);
        dispatch(gotKeys([]));
      }
    )
  };
  return data;
}

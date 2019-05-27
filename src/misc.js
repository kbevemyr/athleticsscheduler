
/**
 * Settings
 */

const MINUTE_PX = 4;
const HOUR_PX = 60*MINUTE_PX;
//const DAY_HR = 9;
//const DAY_MIN = DAY_HR*60;
//const ARENA_PX = DAY_HR*HOUR_PX;

export const COLORS = ['darksalmon', 'darkseagreen', 'hotpink', 'lavender', 'lemonchiffon',
    'lightblue', 'lightcoral', 'lightcyan', 'lightpink', 'lightgray', 'palegreen',
    'mediumaquamarine', 'mistyrose', 'navojowhite', 'oldlace', 'papayawhip', 'pink',
'palegoldenrod', 'powderblue'];

/*
  Diverse funktioner, borde flyttas till actions?
*/
/*
const debug = true;
function debugOutput(cl) {
  cl;
}
*/

export function getDayStarttime(comp, day) {
  return comp.days.find(x => x.id === day).starttime;
}

export function getDayEndtime(comp, day) {
  return comp.days.find(x => x.id === day).endtime;;
}

function getArenas_old(comp, day) {
  return comp.dxa.find(x => x.day === day).arenas;
}

export function getArenas (comp, day) {
  let es = comp.events.filter(e => e.day === day);
  let ess = Array.from(new Set(es.map(e => e.arena)));
  //console.log("getArenas. arenas ="+JSON.stringify(ess));
  return ess;
}

export function getArena(comp, aid) {
  //console.log("getArena. "+aid);
  let arena = comp.arenas.find(x => x.id === aid);
  //console.log("getArena. arena = "+JSON.stringify(arena));
  return arena;
}

export function getEventsID(comp, arena, day) {
  return comp.events.filter(x => (x.arena === arena && x.day === day)).map(x => x.id);
}

export function getEvent(comp, eid) {
  var e = comp.events.find(x => x.id === eid);
  return e;
}

/**
 * Utilities
 */

export function MinutesToPX(time) {
    return (time*MINUTE_PX);
}

export function PXToMinutes(px) {
    return (px/MINUTE_PX);
}

export function timeStrToMinutes(time) {
    var x = time.split(':');
    //console.log("timeStrToPX: "+ x[0]+ "-"+x[1]);
    return (x[0]*60+x[1]*1);
}

export function timeStrToPX(time) {
  return MinutesToPX(timeStrToMinutes(time));
}

export function presentTime(timeunits) {
    var hh = Math.floor(timeunits/60);
    //console.log("hours: "+hh+ " units: "+timeunits);
    var mm = timeunits - hh*60;
    if (hh < 10) {hh = "0"+hh;}
    if (mm < 10) {mm = "0"+mm;}

    return (hh+":"+mm);
}

export function getBoxSize(start, end) {
  return (end-start)*MINUTE_PX;
}

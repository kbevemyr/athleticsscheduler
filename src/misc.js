
/**
 * Settings
 */

const MINUTE_PX = 4;
const HOUR_PX = 60*MINUTE_PX;
const DAY_HR = 9;
const ARENA_PX = DAY_HR*HOUR_PX;

export const COLORS = ['darksalmon', 'darkseagreen', 'hotpink', 'lavender', 'lemonchiffon',
    'lightblue', 'lightcoral', 'lightcyan', 'lightpink', 'lightgray', 'palegreen',
    'mediumaquamarine', 'mistyrose', 'navojowhite', 'oldlace', 'papayawhip', 'pink',
'palegoldenrod', 'powderblue'];

/*
  Diverse funktioner, borde flyttas till actions?
*/

export function getDayStarttime(comp, day) {
  //return "08:00";
  //return SERVERdaysTest.filter(x => x.id === day).starttime;
  return comp.days.filter(x => x.id === day).starttime;
}

export function getArenas(comp, day) {
  return comp.dxa.find(x => x.day === day).arenas;
}

export function getArena(comp, aid) {
  return comp.arenas.find(x => x.id === aid);
}

export function getEventsID(comp, day) {
  return comp.axe.find(x => x.arena === day).events;
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
    console.log("timeStrToPX: "+ x[0]+ "-"+x[1]);
    return (x[0]*60+x[1]*1);
}

export function timeStrToPX(time) {
  return MinutesToPX(timeStrToMinutes(time));
}

export function getArenaSize() {
  return ARENA_PX;
}

export function presentTime(timeunits) {
    var hh = Math.floor(timeunits/60);
    //console.log("hours: "+hh+ " units: "+timeunits);
    var mm = timeunits - hh*60;
    if (hh < 10) {hh = "0"+hh;}
    if (mm < 10) {mm = "0"+mm;}

    return (hh+":"+mm);
}

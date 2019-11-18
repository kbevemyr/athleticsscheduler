
/**
 * Settings
 */

const MINUTE_PX = 4;

/*
export const COLORS = ['darksalmon', 'darkseagreen', 'hotpink', 'lavender', 'lemonchiffon',
    'lightblue', 'lightcoral', 'lightcyan', 'lightpink', 'lightgray', 'palegreen',
    'mediumaquamarine', 'mistyrose', 'oldlace', 'papayawhip', 'pink',
'palegoldenrod', 'powderblue', 'yellow', 'red', 'darkblue'];

Regexp for doing query replace for color codes.
(\#[0-9a-z]+),
'$1',

http://phrogz.net/css/distinct-colors.html
'#ff0022',
'#000073',
'#0000d9',
*/

export const COLORS = [
'#73005c', '#40a6ff', '#00ff88', '#f2da79', '#e56739', '#bf3043', '#f240ff', '#0000cc', '#1d4b73', '#a3d9a3', '#ffaa00', '#664d4d', '#d9a3b8', '#877ca6', '#66c5cc', '#a1f200', '#8c5b23', '#ff40a6', '#0000ff', '#004cbf', '#1d7356', '#778c23', '#b39886',
];
export const defaultColor = '#DADADA'; //'lightgray'

/*
https://ux.stackexchange.com/questions/114952/determine-the-best-text-color-for-a-given-background-color

The contrast ratio is calculated as (L1 + 0.05) / (L2 + 0.05), where
  L1 is the: relative luminance of the lighter of the colors, and
  L2 is the relative luminance of the darker of the colors.

  We choose between off-black (eg #101010) and off-white (eg #f0f0f0).
*/
export function getTextColor(color) {
  let dark = "#101010";
  let light = "#f0f0f0";

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = (color >> 8) & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp<127.5) {

        return light;
    }
    else {

        return dark;
    }
}

/*
  http://www.sitepoint.com/javascript-generate-lighter-darker-color/
*/
export function colorLuminance(hex, lum) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex.replace(/(.)/g, '$1$1');
  }
  lum = lum || 0;
  // Convert to decimal and change luminosity
  var rgb = "#",
    c;
  for (var i = 0; i < 3; ++i) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}


/*
  Diverse funktioner, borde flyttas till actions?
*/

export const EmptyCompetition = {
            "key": "",
            "name": "",
            "version": "",
            "days": [],
            "arenas": [],
            "classes": [],
            "grenar": [],
            "events": [],
        };

export function getDayStarttime(comp, day) {
  var startvalues = comp.events.filter(x => x.day === day).map(x => parseInt(x.starttime,10)-parseInt(x.preptime,10)).sort((a,b) => a-b);
  return startvalues[0];
}

export function getDayEndtime(comp, day) {
  var startvalues = comp.events.filter(x => x.day === day).map(x => parseInt(x.starttime,10)+parseInt(x.duration,10)).sort((a,b) => b-a);
  return startvalues[0];
}

export function getArenas (comp, day) {
  let es = comp.events.filter(e => e.day === day);
  let ess = Array.from(new Set(es.map(e => e.arena)));
  //console.log("getArenas. arenas ="+JSON.stringify(ess));
  return ess;
}

export function getTypeArenas (comp, day, type) {
  let es = comp.events.filter(e => (e.day === day && e.grentype.startsWith(type)));
  let ess = Array.from(new Set(es.map(e => e.arena)));
  //console.log("getTypeArenas("+type+"). arenas =");
  //console.dir(ess);
  return ess;
}

export function getAllDays (events) {
  let ess = Array.from(new Set(events.map(e => e.day)));
  return ess;
}

export function getAllArenas (events) {
  let ess = Array.from(new Set(events.map(e => e.arena)));
  return ess;
}

export function getAllClasses (events) {
  let ess = Array.from(new Set(events.map(e => e.class)));
  return ess;
}

export function getAllGrens (events) {
  let ess = Array.from(new Set(events.map(e => e.gren)));
  return ess;
}

export function getArena(comp, aid) {
  //console.log("getArena. "+aid);
  let arena = comp.arenas.find(x => x.id === aid);
  //console.log("getArena. arena("+aid+") = "+JSON.stringify(arena));
  return arena;
}

export function getEventsID(comp, arena, day) {
  return comp.events.filter(x => (x.arena === arena && x.day === day)).map(x => x.id);
}

export function getClassEventsID(comp, c) {
  return comp.events.filter(x => (x.class === c)).map(x => x.id);
}

export function getEvent(comp, eid) {
  var e = comp.events.find(x => x.id === eid);
  return e;
}

export function getName(id, comp, nameType) {
  var name = comp[nameType].find(x => x.id === id).name;
  return name;
}

export function newID() {
  var eID = Date.now();
  return eID+"";
}

export function getEmptyEvent() {
  var newId = 9999;
  // Id sätts när man sparar ner det, 9999 får indikera att det är ett nytt id.
  return {id: newId, day: "", arena: "", starttime: "540", duration: "60", preptime: "20", class: "", gren: "", grentype: ""}
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
  console.log("getBoxSize "+(end-start)*MINUTE_PX);
  return (end-start)*MINUTE_PX;
}


/*
  Event overlap, timewise
*/

export function overlap(e1, e2) {
  var response = false;
  const st1 = parseInt(e1.starttime, 10);
  const et1 = parseInt(e1.starttime,10) + parseInt(e1.duration, 10);
  const st2 = parseInt(e2.starttime, 10);
  const et2 = parseInt(e2.starttime, 10) + parseInt(e2.duration, 10);

  if(e1.day === e2.day) {
    if(st2 <= et1 && st2 >= st1) {
      response = true;
    }
    if(st1 <= et2 && st1 >= st2) {
      response = true;
    }
  }

  return response;
}

function sameEvent(e1,e2) {
  if(e1.id === e2.id) {
    return true;
  } else {
    return false;
  }
}

/*
function pp(e) {
  return (e.id+", "+e.starttime+";"+e.duration+"  "+e.class+":"+e.gren);
}
*/

// Checks the whole schema for time clashes between events.
export function healthCheckSchema(eventsData) {
  var out = true;
  var abnormalEvents = [];
  for(var i=0; i < eventsData.length; i++) {
    var rowi = eventsData[i];
    for(var j=0; j < eventsData.length; j++) {
      var rowj = eventsData[j];
      if(!sameEvent(rowi,rowj)) {
        if(rowi.class === rowj.class) {
          if(overlap(rowi, rowj)) {
            //console.log("OVERLAP: ["+pp(rowi)+"] || ["+pp(rowj)+"]");
            var oObj = {key: rowi.id, value: rowj.id};
            abnormalEvents.push(oObj);
            out = false;
          }
        }
      }
    }
  }
  console.log("healthCheckSchema : "+out+" "+JSON.stringify(abnormalEvents));
  return abnormalEvents;
}

// Checks the whole schema for time clashes between event.
// Returns an Array och {key:id1, value:id2} pairs
export function healthCheckSchema2(events, day) {
  var eventsData = events.filter(e => e.day === day);
  var out = true;
  var abnormalEvents = [];
  for(var i=0; i < eventsData.length; i++) {
    var rowi = eventsData[i];
    for(var j=0; j < eventsData.length; j++) {
      var rowj = eventsData[j];
      if(!sameEvent(rowi,rowj)) {
        if(rowi.class === rowj.class) {
          if(overlap(rowi, rowj)) {
            //console.log("OVERLAP: ["+pp(rowi)+"] || ["+pp(rowj)+"]");
            var oObj = {key: rowi.id, value: rowj.id};
            abnormalEvents.push(oObj);
            out = false;
          }
        }
      }
    }
  }
  console.log("healthCheckSchema2 : "+out+" "+JSON.stringify(abnormalEvents));
  return abnormalEvents;
}

/*
  A membership in the list represents that the object is active

  xs - key:value list, where value is (p: bool, o: id) p represents if the key should be visual in overview
  x - is an ID

  returnvalue - if x is visualied in overview, default is false
*/

export function isCollision(xs, id) {
  var obj = xs[id];
  var res = false;
  if (obj == null) {
    res = false;
  } else {
    res = obj.p;
  }

  return res;
}

export function getCollisions(xs, id) {
  var os = xs.filter(x => x.key === id);

  return os;
}

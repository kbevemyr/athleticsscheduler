
/*
  Äldre representation av data som ger en bättre helhet tror jag.
*/

var SERVERdaysTest = [
    {"id": "801", "name": "lördag","starttime": 510, "endtime": 1020},
  ];

const comp2018daysTest = [
    {"id": "lördag", "name": "lördag","starttime": 540, "endtime": 940},
    {"id": "söndag", "name": "söndag","starttime": 540, "endtime": 960},
];

var SERVERarenasTest = [
    {"id": "911", "name": "Löpning", "grentyp": "löpning"},
    {"id": "912", "name": "LängdA", "grentyp": "längd"},
    {"id": "913", "name": "LängdB", "grentyp": "längd"},
    {"id": "914", "name": "HöjdA", "grentyp": "höjd"},
    {"id": "915", "name": "HöjdB", "grentyp": "höjd"},
    {"id": "916", "name": "Kula", "grentyp": "kula"},
];

const comp2018arenasTest = [
    {"id": "l", "name": "Löpning", "grentyp": "löpning"},
    {"id": "k", "name": "Kula", "grentyp": "kula"},
    {"id": "v", "name": "Vikt", "grentyp": "vikt"},
    {"id": "h", "name": "Höjd", "grentyp": "höjd"},
    {"id": "ld", "name": "Längd", "grentyp": "längd"},
    {"id": "s", "name": "Stav", "grentyp": "stav"},
];

var SERVEReventsTest = [
     {"id": "13", "day": "801","arena": "911", "starttime": 510, "duration": 25, "class": "P06", "gren": "60m"},
     {"id": "25", "day": "801","arena": "911", "starttime": 535, "duration": 25, "class": "F04", "gren": "60m"},
     {"id": "5", "day": "801","arena": "911", "starttime": 560, "duration": 15, "class": "P04", "gren": "60m"},
     {"id": "21", "day": "801","arena": "911", "starttime": 575, "duration": 15, "class": "F03", "gren": "60m"},
    {"id": "1", "day": "801","arena": "911", "starttime": 590, "duration": 10, "class": "P03", "gren": "60m"},
    {"id": "33", "day": "801","arena": "911", "starttime": 600, "duration": 20, "class": "F06", "gren": "60m"},
    {"id": "100", "day": "801","arena": "911", "starttime": 620, "duration": 5, "class": "P06", "gren": "60m F"},
    {"id": "101", "day": "801","arena": "911", "starttime": 625, "duration": 5, "class": "P04", "gren": "60m F"},
    {"id": "102", "day": "801","arena": "911", "starttime": 630, "duration": 5, "class": "F03", "gren": "60m F"},
    {"id": "103", "day": "801","arena": "911", "starttime": 635, "duration": 5, "class": "P03", "gren": "60m F"},
     {"id": "36", "day": "801","arena": "911", "starttime": 640, "duration": 30, "class": "F03", "gren": "60m"},
     {"id": "104", "day": "801","arena": "911", "starttime": 670, "duration": 5, "class": "F04", "gren": "60m F"},
     {"id": "16", "day": "801","arena": "911", "starttime": 675, "duration": 30, "class": "P07 ", "gren": "60m"},
     {"id": "105", "day": "801","arena": "911", "starttime": 705, "duration": 5, "class": "F06", "gren": "60m"},
     {"id": "29", "day": "801","arena": "911", "starttime": 710, "duration": 30, "class": "F05", "gren": "60m"},
     {"id": "9", "day": "801","arena": "911", "starttime": 740, "duration": 20, "class": "P05", "gren": "60m"},
    {"id": "106", "day": "801","arena": "911", "starttime": 760, "duration": 5, "class": "F07", "gren": "60m F"},
    {"id": "107", "day": "801","arena": "911", "starttime": 765, "duration": 5, "class": "P07", "gren": "60m F"},
    {"id": "39", "day": "801","arena": "911", "starttime": 770, "duration": 20, "class": "F08", "gren": "60m"},
    {"id": "19", "day": "801","arena": "911", "starttime": 790, "duration": 20, "class": "P08", "gren": "60m"},
    {"id": "108", "day": "801","arena": "911", "starttime": 810, "duration": 5, "class": "F05", "gren": "60m F"},
    {"id": "14", "day": "801","arena": "911", "starttime": 815, "duration": 25, "class": "P06", "gren": "600m"},
    {"id": "34", "day": "801","arena": "911", "starttime": 840, "duration": 20, "class": "F06", "gren": "600m"},
    {"id": "6", "day": "801","arena": "911", "starttime": 860, "duration": 10, "class": "P04", "gren": "600m"},
    {"id": "109", "day": "801","arena": "911", "starttime": 870, "duration": 5, "class": "P05", "gren": "60m F"},
    {"id": "110", "day": "801","arena": "911", "starttime": 875, "duration": 5, "class": "F08", "gren": "60m F"},
    {"id": "111", "day": "801","arena": "911", "starttime": 880, "duration": 5, "class": "P08", "gren": "60m F"},
    {"id": "26", "day": "801","arena": "911", "starttime": 885, "duration": 20, "class": "F04", "gren": "600m"},
    {"id": "10", "day": "801","arena": "911", "starttime": 905, "duration": 20, "class": "P05", "gren": "600m"},
    {"id": "30", "day": "801","arena": "911", "starttime": 925, "duration": 25, "class": "F05", "gren": "600m"},
    {"id": "37", "day": "801","arena": "911", "starttime": 950, "duration": 20, "class": "F07", "gren": "400m"},
    {"id": "17", "day": "801","arena": "911", "starttime": 970, "duration": 30, "class": "P07", "gren": "400m"},
    {"id": "22", "day": "801","arena": "911", "starttime": 1000, "duration": 10, "class": "F03", "gren": "600m"},
    {"id": "2", "day": "801","arena": "911", "starttime": 1010, "duration": 5, "class": "P03", "gren": "600m"},

    {"id": "5633", "day": "801","arena": "912", "starttime": 550, "duration": 50, "class": "P06", "gren": "Längd"},
    {"id": "5433", "day": "801","arena": "912", "starttime": 600, "duration": 50, "class": "F04", "gren": "Längd"},
    {"id": "3233", "day": "801","arena": "912", "starttime": 650, "duration": 30, "class": "P04", "gren": "Längd"},
    {"id": "6433", "day": "801","arena": "912", "starttime": 680, "duration": 60, "class": "F07", "gren": "Längd"},
    {"id": "4533", "day": "801","arena": "912", "starttime": 760, "duration": 40, "class": "F06", "gren": "Längd"},
    {"id": "7133", "day": "801","arena": "912", "starttime": 830, "duration": 65, "class": "P07", "gren": "Längd"},
    {"id": "4433", "day": "801","arena": "912", "starttime": 910, "duration": 40, "class": "F08", "gren": "Längd"},
    {"id": "5033", "day": "801","arena": "912", "starttime": 950, "duration": 45, "class": "P08", "gren": "Längd"},

    {"id": "5644", "day": "801","arena": "913", "starttime": 550, "duration": 50, "class": "P06", "gren": "Längd"},
    {"id": "5444", "day": "801","arena": "913", "starttime": 600, "duration": 50, "class": "F04", "gren": "Längd"},
    {"id": "3244", "day": "801","arena": "913", "starttime": 650, "duration": 30, "class": "P04", "gren": "Längd"},
    {"id": "6444", "day": "801","arena": "913", "starttime": 680, "duration": 60, "class": "F07", "gren": "Längd"},
    {"id": "4544", "day": "801","arena": "913", "starttime": 760, "duration": 40, "class": "F06", "gren": "Längd"},
    {"id": "7144", "day": "801","arena": "913", "starttime": 830, "duration": 65, "class": "P07", "gren": "Längd"},
    {"id": "4444", "day": "801","arena": "913", "starttime": 910, "duration": 40, "class": "F08", "gren": "Längd"},
    {"id": "5044", "day": "801","arena": "913", "starttime": 950, "duration": 45, "class": "P08", "gren": "Längd"},

    {"id": "31a", "day": "801","arena": "914", "starttime": 540, "duration": 105, "class": "F05", "gren": "Höjd"},
    {"id": "11a", "day": "801","arena": "914", "starttime": 650, "duration": 80, "class": "P05", "gren": "Höjd"},
    {"id": "3", "day": "801","arena": "914", "starttime": 740, "duration": 50, "class": "P03", "gren": "Höjd"},

    {"id": "31b", "day": "801","arena": "915", "starttime": 540, "duration": 105, "class": "F05", "gren": "Höjd"},
    {"id": "11b", "day": "801","arena": "915", "starttime": 650, "duration": 80, "class": "P05", "gren": "Höjd"},
    {"id": "23", "day": "801","arena": "915", "starttime": 740, "duration": 100, "class": "F03", "gren": "Höjd"},

    {"id": "8", "day": "801","arena": "916", "starttime": 585, "duration": 105, "class": "P04", "gren": "Kula"},
    {"id": "24", "day": "801","arena": "916", "starttime": 645, "duration": 80, "class": "F03", "gren": "Kula"},
    {"id": "28", "day": "801","arena": "916", "starttime": 695, "duration": 50, "class": "F04", "gren": "Kula"},
    {"id": "4", "day": "801","arena": "916", "starttime": 745, "duration": 25, "class": "P03", "gren": "Kula"},
    {"id": "12", "day": "801","arena": "916", "starttime": 775, "duration": 50, "class": "P05", "gren": "Kula"},
    {"id": "32", "day": "801","arena": "916", "starttime": 845, "duration": 80, "class": "F05", "gren": "Kula"},
];

const comp2018eventsTest = [
    {id: "P1160m", day: "lördag", arena: "l", starttime: "540", duration: "15", class: "P11", gren: "60m"},
    {id: "F11höjd", day: "lördag", arena: "h", starttime: "540", duration: "60", class: "F11", gren: "höjd"},
    {id: "F12kula", day: "lördag", arena: "k", starttime: "540", duration: "60", class: "F12", gren: "kula"},
    {id: "F13längd", day: "lördag", arena: "ld", starttime: "550", duration: "45", class: "F13", gren: "längd"},
    {id: "F960m", day: "lördag", arena: "l", starttime: "555", duration: "15", class: "F9", gren: "60m"},
    {id: "P960m", day: "lördag", arena: "l", starttime: "570", duration: "21", class: "P9", gren: "60m"},
    {id: "F1560m", day: "lördag", arena: "l", starttime: "591", duration: "15", class: "F15", gren: "60m"},
    {id: "P1560m", day: "lördag", arena: "l", starttime: "606", duration: "9", class: "P15", gren: "60m"},
    {id: "F1160m", day: "lördag", arena: "l", starttime: "615", duration: "21", class: "F11", gren: "60m"},
    {id: "P13längd", day: "lördag", arena: "ld", starttime: "620", duration: "20", class: "P13", gren: "längd"},
    {id: "P11höjd", day: "lördag", arena: "h", starttime: "620", duration: "40", class: "P11", gren: "höjd"},
    {id: "P860m", day: "lördag", arena: "l", starttime: "636", duration: "12", class: "P8", gren: "60m"},
    {id: "P12kula", day: "lördag", arena: "k", starttime: "640", duration: "45", class: "P12", gren: "kula"},
    {id: "F860m", day: "lördag", arena: "l", starttime: "648", duration: "12", class: "F8", gren: "60m"},
    {id: "F1260m", day: "lördag", arena: "l", starttime: "660", duration: "21", class: "F12", gren: "60m"},
    {id: "P9längd", day: "lördag", arena: "ld", starttime: "680", duration: "45", class: "P9", gren: "längd"},
    {id: "F1360m", day: "lördag", arena: "l", starttime: "681", duration: "24", class: "F13", gren: "60m"},
    {id: "P15höjd", day: "lördag", arena: "h", starttime: "700", duration: "40", class: "P15", gren: "höjd"},
    {id: "P1360m", day: "lördag", arena: "l", starttime: "705", duration: "9", class: "P13", gren: "60m"},
    {id: "P1260m", day: "lördag", arena: "l", starttime: "714", duration: "15", class: "P12", gren: "60m"},
    {id: "F960m Final", day: "lördag", arena: "l", starttime: "729", duration: "5", class: "F9", gren: "60m Final"},
    {id: "F1560m Final", day: "lördag", arena: "l", starttime: "734", duration: "5", class: "F15", gren: "60m Final"},
    {id: "F860m Final", day: "lördag", arena: "l", starttime: "739", duration: "5", class: "F8", gren: "60m Final"},
    {id: "P860m Final", day: "lördag", arena: "l", starttime: "744", duration: "5", class: "P8", gren: "60m Final"},
    {id: "P960m Final", day: "lördag", arena: "l", starttime: "749", duration: "5", class: "P9", gren: "60m Final"},
    {id: "F9längd", day: "lördag", arena: "ld", starttime: "750", duration: "30", class: "F9", gren: "längd"},
    {id: "F15vikt", day: "lördag", arena: "v", starttime: "750", duration: "30", class: "F15", gren: "vikt"},
    {id: "F1160m Final", day: "lördag", arena: "l", starttime: "754", duration: "5", class: "F11", gren: "60m Final"},
    {id: "P1160m Final", day: "lördag", arena: "l", starttime: "759", duration: "5", class: "P11", gren: "60m Final"},
    {id: "F1260m Final", day: "lördag", arena: "l", starttime: "764", duration: "5", class: "F12", gren: "60m Final"},
    {id: "P1260m Final", day: "lördag", arena: "l", starttime: "769", duration: "5", class: "P12", gren: "60m Final"},
    {id: "F1360m Final", day: "lördag", arena: "l", starttime: "774", duration: "5", class: "F13", gren: "60m Final"},
    {id: "P1360m Final", day: "lördag", arena: "l", starttime: "779", duration: "5", class: "P13", gren: "60m Final"},
    {id: "P1560m Final", day: "lördag", arena: "l", starttime: "784", duration: "10", class: "P15", gren: "60m Final"},
    {id: "F9400m", day: "lördag", arena: "l", starttime: "794", duration: "24", class: "F9", gren: "400m"},
    {id: "F8längd", day: "lördag", arena: "ld", starttime: "800", duration: "35", class: "F8", gren: "längd"},
    {id: "P9400m", day: "lördag", arena: "l", starttime: "818", duration: "36", class: "P9", gren: "400m"},
    {id: "F15höjd", day: "lördag", arena: "h", starttime: "820", duration: "45", class: "F15", gren: "höjd"},
    {id: "P15vikt", day: "lördag", arena: "v", starttime: "820", duration: "30", class: "P15", gren: "vikt"},
    {id: "F11600m", day: "lördag", arena: "l", starttime: "854", duration: "30", class: "F11", gren: "600m"},
    {id: "P8längd", day: "lördag", arena: "ld", starttime: "860", duration: "35", class: "P8", gren: "längd"},
    {id: "P11600m", day: "lördag", arena: "l", starttime: "884", duration: "18", class: "P11", gren: "600m"},
    {id: "F13600m", day: "lördag", arena: "l", starttime: "902", duration: "18", class: "F13", gren: "600m"},
    {id: "P13600m", day: "lördag", arena: "l", starttime: "920", duration: "18", class: "P13", gren: "600m"},
    {id: "P10höjd", day: "söndag", arena: "h", starttime: "540", duration: "60", class: "P10", gren: "höjd"},
    {id: "F13kula", day: "söndag", arena: "k", starttime: "560", duration: "60", class: "F13", gren: "kula"},
    {id: "P15stav", day: "söndag", arena: "s", starttime: "560", duration: "150", class: "P15", gren: "stav"},
    {id: "F1040mH", day: "söndag", arena: "l", starttime: "570", duration: "24", class: "F10", gren: "40mH"},
    {id: "P1040mH", day: "söndag", arena: "l", starttime: "594", duration: "29", class: "P10", gren: "40mH"},
    {id: "F10höjd", day: "söndag", arena: "h", starttime: "620", duration: "70", class: "F10", gren: "höjd"},
    {id: "P1160mH", day: "söndag", arena: "l", starttime: "623", duration: "9", class: "P11", gren: "60mH"},
    {id: "F1160mH", day: "söndag", arena: "l", starttime: "632", duration: "12", class: "F11", gren: "60mH"},
    {id: "F1260mH", day: "söndag", arena: "l", starttime: "644", duration: "15", class: "F12", gren: "60mH"},
    {id: "F1360mH", day: "söndag", arena: "l", starttime: "659", duration: "17", class: "F13", gren: "60mH"},
    {id: "P11kula", day: "söndag", arena: "k", starttime: "660", duration: "30", class: "P11", gren: "kula"},
    {id: "P1260mH", day: "söndag", arena: "l", starttime: "676", duration: "12", class: "P12", gren: "60mH"},
    {id: "P1360mH", day: "söndag", arena: "l", starttime: "688", duration: "9", class: "P13", gren: "60mH"},
    {id: "F1560mH", day: "söndag", arena: "l", starttime: "697", duration: "14", class: "F15", gren: "60mH"},
    {id: "P12höjd", day: "söndag", arena: "h", starttime: "710", duration: "45", class: "P12", gren: "höjd"},
    {id: "P1560mH", day: "söndag", arena: "l", starttime: "711", duration: "11", class: "P15", gren: "60mH"},
    {id: "P1040mH Final", day: "söndag", arena: "l", starttime: "722", duration: "5", class: "P10", gren: "40mH Final"},
    {id: "F1040mH Final", day: "söndag", arena: "l", starttime: "727", duration: "10", class: "F10", gren: "40mH Final"},
    {id: "F1160mH Final", day: "söndag", arena: "l", starttime: "737", duration: "5", class: "F11", gren: "60mH Final"},
    {id: "F15stav", day: "söndag", arena: "s", starttime: "740", duration: "180", class: "F15", gren: "stav"},
    {id: "F1260mH Final", day: "söndag", arena: "l", starttime: "742", duration: "5", class: "F12", gren: "60mH Final"},
    {id: "F1360mH Final", day: "söndag", arena: "l", starttime: "747", duration: "5", class: "F13", gren: "60mH Final"},
    {id: "P1160mH Final", day: "söndag", arena: "l", starttime: "752", duration: "10", class: "P11", gren: "60mH Final"},
    {id: "P1360mH Final", day: "söndag", arena: "l", starttime: "762", duration: "5", class: "P13", gren: "60mH Final"},
    {id: "P1260mH Final", day: "söndag", arena: "l", starttime: "767", duration: "8", class: "P12", gren: "60mH Final"},
    {id: "F1560mH Final", day: "söndag", arena: "l", starttime: "775", duration: "10", class: "F15", gren: "60mH Final"},
    {id: "F12höjd", day: "söndag", arena: "h", starttime: "775", duration: "60", class: "F12", gren: "höjd"},
    {id: "F11kula", day: "söndag", arena: "k", starttime: "775", duration: "25", class: "F11", gren: "kula"},
    {id: "P1560mH Final", day: "söndag", arena: "l", starttime: "785", duration: "10", class: "P15", gren: "60mH Final"},
    {id: "P12600m", day: "söndag", arena: "l", starttime: "795", duration: "18", class: "P12", gren: "600m"},
    {id: "P10600m", day: "söndag", arena: "l", starttime: "813", duration: "36", class: "P10", gren: "600m"},
    {id: "P13kula", day: "söndag", arena: "k", starttime: "830", duration: "30", class: "P13", gren: "kula"},
    {id: "F10600m", day: "söndag", arena: "l", starttime: "849", duration: "42", class: "F10", gren: "600m"},
    {id: "F13höjd", day: "söndag", arena: "h", starttime: "850", duration: "40", class: "F13", gren: "höjd"},
    {id: "F12600m", day: "söndag", arena: "l", starttime: "891", duration: "24", class: "F12", gren: "600m"},
    {id: "P13höjd", day: "söndag", arena: "h", starttime: "910", duration: "45", class: "P13", gren: "höjd"},
    {id: "P15800m", day: "söndag", arena: "l", starttime: "915", duration: "18", class: "P15", gren: "800m"},
    {id: "F15800m", day: "söndag", arena: "l", starttime: "933", duration: "24", class: "F15", gren: "800m"}
];

var SERVERdxaTest = [
    {"day": "801", "arenas": ["911", "912", "913", "914", "915", "916"]},
  ];

const comp2018dxaTest = [
    {"day": "lördag", "arenas": ["k", "s", "ld", "h", "l"]},
    {"day": "söndag", "arenas": ["k", "s", "ld", "h", "l"]}
];

var SERVERaxeTest = [
    {"arena": "911", "events": ["13","25","5","21","1","33","100","101","102","103","36","104","16","105","29","9","106","107","39","19","108","14","34","6","109","110","111","26","10","30","37","17","22","2"]},
    {"arena": "912", "events": ["5633","5433","3233","6433","4533","7133","4433","5033"]},
    {"arena": "913", "events": ["5644","5444","3244","6444","4544","7144","4444","5044"]},
    {"arena": "914", "events": ["31a","11a","3"]},
    {"arena": "915", "events": ["31b","11b","23"]},
    {"arena": "916", "events": ["8","24","28","4","12","32"]},
  ];

const comp2018axeTest = [
    {"arena": "l", "events": []},
    {"arena": "k", "events": []},
    {"arena": "s", "events": []},
    {"arena": "h", "events": []},
    {"arena": "ld", "events": []},
];

/*
  Testdata for athleticsscheduler, SAYO Indoor 2017
*/
var SERVERcontestTest2017 = {
    "name": "SAYO Indoor 2017",
    "key": "test",
    "version": "1.0",
    "GLOBALID": 1000,
    "days": SERVERdaysTest,
    "arenas": SERVERarenasTest,
    "events": SERVEReventsTest,
    "dxa": SERVERdxaTest,
    "axe" : SERVERaxeTest
};

/*
  Testdata for athleticsscheduler, SAYO Indoor 2018
*/
const comp2018 = {
  "name": "SAYO Indoor 2018",
  "key": "test",
  "version": "1.0",
  "GLOBALID": 2000,
  "days": comp2018daysTest,
  "arenas": comp2018arenasTest,
  "events": comp2018eventsTest,
  "dxa": comp2018dxaTest,
  "axe" : comp2018axeTest
}

//export const comptest = SERVERcontestTest2017;
export const comptest = comp2018;
export const localComps = [SERVERcontestTest2017, comp2018];

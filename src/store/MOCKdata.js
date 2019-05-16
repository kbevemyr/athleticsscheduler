
/*
  Äldre representation av data som ger en bättre helhet tror jag.
*/

var SERVERdaysTest = [
    {"id": "801", "name": "lördag", "starttime": 510},
  ];

const comp2018daysTest = [
    {"id": "lördag", "name": "lördag", "starttime": 510},
    {"id": "söndag", "name": "söndag", "starttime": 510},
];

var SERVERarenasTest = [
    {"id": "911", "name": "Rundbana", "grentyp": "löpning"},
    {"id": "912", "name": "LängdA", "grentyp": "längd"},
    {"id": "913", "name": "LängdB", "grentyp": "längd"},
    {"id": "914", "name": "HöjdA", "grentyp": "höjd"},
    {"id": "915", "name": "HöjdB", "grentyp": "höjd"},
    {"id": "916", "name": "Kula", "grentyp": "kula"},
    {"id": "917", "name": "Prisutdelning", "grentyp": "längd"},
    {"id": "918", "name": "Rakbana", "grentyp": "löpning"},
];

const comp2018arenasTest = [
    {"id": "löpning", "name": "Löpning", "grentyp": "löpning"},
    {"id": "kula", "name": "Kula", "grentyp": "kula"},
    {"id": "höjd", "name": "Höjd", "grentyp": "höjd"},
    {"id": "längd", "name": "Längd", "grentyp": "längd"},
    {"id": "stav", "name": "Stav", "grentyp": "stav"},
];

var SERVEReventsTest = [
     {"id": "13", "day": "801", "starttime": 0, "duration": 25, "class": "P06", "gren": "60m"},
     {"id": "25", "day": "801", "starttime": 25, "duration": 25, "class": "F04", "gren": "60m"},
     {"id": "5", "day": "801", "starttime": 50, "duration": 15, "class": "P04", "gren": "60m"},
     {"id": "21", "day": "801", "starttime": 65, "duration": 15, "class": "F03", "gren": "60m"},
    {"id": "1", "day": "801", "starttime": 80, "duration": 10, "class": "P03", "gren": "60m"},
    {"id": "33", "day": "801", "starttime": 90, "duration": 20, "class": "F06", "gren": "60m"},
    {"id": "100", "day": "801", "starttime": 110, "duration": 5, "class": "P06", "gren": "60m F"},
    {"id": "101", "day": "801", "starttime": 115, "duration": 5, "class": "P04", "gren": "60m F"},
    {"id": "102", "day": "801", "starttime": 120, "duration": 5, "class": "F03", "gren": "60m F"},
    {"id": "103", "day": "801", "starttime": 125, "duration": 5, "class": "P03", "gren": "60m F"},
     {"id": "36", "day": "801", "starttime": 130, "duration": 30, "class": "F03", "gren": "60m"},
     {"id": "104", "day": "801", "starttime": 160, "duration": 5, "class": "F04", "gren": "60m F"},
     {"id": "16", "day": "801", "starttime": 165, "duration": 30, "class": "P07 ", "gren": "60m"},
     {"id": "105", "day": "801", "starttime": 195, "duration": 5, "class": "F06", "gren": "60m"},
     {"id": "29", "day": "801", "starttime": 200, "duration": 30, "class": "F05", "gren": "60m"},
     {"id": "9", "day": "801", "starttime": 230, "duration": 20, "class": "P05", "gren": "60m"},
    {"id": "106", "day": "801", "starttime": 250, "duration": 5, "class": "F07", "gren": "60m F"},
    {"id": "107", "day": "801", "starttime": 255, "duration": 5, "class": "P07", "gren": "60m F"},
    {"id": "39", "day": "801", "starttime": 260, "duration": 20, "class": "F08", "gren": "60m"},
    {"id": "19", "day": "801", "starttime": 280, "duration": 20, "class": "P08", "gren": "60m"},
    {"id": "108", "day": "801", "starttime": 300, "duration": 5, "class": "F05", "gren": "60m F"},
    {"id": "14", "day": "801", "starttime": 305, "duration": 25, "class": "P06", "gren": "600m"},
    {"id": "34", "day": "801", "starttime": 330, "duration": 20, "class": "F06", "gren": "600m"},
    {"id": "6", "day": "801", "starttime": 350, "duration": 10, "class": "P04", "gren": "600m"},
    {"id": "109", "day": "801", "starttime": 360, "duration": 5, "class": "P05", "gren": "60m F"},
    {"id": "110", "day": "801", "starttime": 365, "duration": 5, "class": "F08", "gren": "60m F"},
    {"id": "111", "day": "801", "starttime": 370, "duration": 5, "class": "P08", "gren": "60m F"},
    {"id": "26", "day": "801", "starttime": 375, "duration": 20, "class": "F04", "gren": "600m"},
    {"id": "10", "day": "801", "starttime": 395, "duration": 20, "class": "P05", "gren": "600m"},
    {"id": "30", "day": "801", "starttime": 415, "duration": 25, "class": "F05", "gren": "600m"},
    {"id": "37", "day": "801", "starttime": 440, "duration": 20, "class": "F07", "gren": "400m"},
    {"id": "17", "day": "801", "starttime": 460, "duration": 30, "class": "P07", "gren": "400m"},
    {"id": "22", "day": "801", "starttime": 490, "duration": 10, "class": "F03", "gren": "600m"},
    {"id": "2", "day": "801", "starttime": 500, "duration": 5, "class": "P03", "gren": "600m"},

    {"id": "5633", "day": "801", "starttime": 40, "duration": 50, "class": "P06", "gren": "Längd"},
    {"id": "5433", "day": "801", "starttime": 90, "duration": 50, "class": "F04", "gren": "Längd"},
    {"id": "3233", "day": "801", "starttime": 140, "duration": 30, "class": "P04", "gren": "Längd"},
    {"id": "6433", "day": "801", "starttime": 170, "duration": 60, "class": "F07", "gren": "Längd"},
    {"id": "4533", "day": "801", "starttime": 250, "duration": 40, "class": "F06", "gren": "Längd"},
    {"id": "7133", "day": "801", "starttime": 320, "duration": 65, "class": "P07", "gren": "Längd"},
    {"id": "4433", "day": "801", "starttime": 400, "duration": 40, "class": "F08", "gren": "Längd"},
    {"id": "5033", "day": "801", "starttime": 440, "duration": 45, "class": "P08", "gren": "Längd"},

    {"id": "5644", "day": "801", "starttime": 40, "duration": 50, "class": "P06", "gren": "Längd"},
    {"id": "5444", "day": "801", "starttime": 90, "duration": 50, "class": "F04", "gren": "Längd"},
    {"id": "3244", "day": "801", "starttime": 140, "duration": 30, "class": "P04", "gren": "Längd"},
    {"id": "6444", "day": "801", "starttime": 170, "duration": 60, "class": "F07", "gren": "Längd"},
    {"id": "4544", "day": "801", "starttime": 250, "duration": 40, "class": "F06", "gren": "Längd"},
    {"id": "7144", "day": "801", "starttime": 320, "duration": 65, "class": "P07", "gren": "Längd"},
    {"id": "4444", "day": "801", "starttime": 400, "duration": 40, "class": "F08", "gren": "Längd"},
    {"id": "5044", "day": "801", "starttime": 440, "duration": 45, "class": "P08", "gren": "Längd"},

    {"id": "31a", "day": "801", "starttime": 30, "duration": 105, "class": "F05", "gren": "Höjd"},
    {"id": "11a", "day": "801", "starttime": 140, "duration": 80, "class": "P05", "gren": "Höjd"},
    {"id": "3", "day": "801", "starttime": 330, "duration": 50, "class": "P03", "gren": "Höjd"},

    {"id": "31b", "day": "801", "starttime": 30, "duration": 105, "class": "F05", "gren": "Höjd"},
    {"id": "11b", "day": "801", "starttime": 140, "duration": 80, "class": "P05", "gren": "Höjd"},
    {"id": "23", "day": "801", "starttime": 230, "duration": 100, "class": "F03", "gren": "Höjd"},

    {"id": "8", "day": "801", "starttime": 75, "duration": 105, "class": "P04", "gren": "Kula"},
    {"id": "24", "day": "801", "starttime": 135, "duration": 80, "class": "F03", "gren": "Kula"},
    {"id": "28", "day": "801", "starttime": 185, "duration": 50, "class": "F04", "gren": "Kula"},
    {"id": "4", "day": "801", "starttime": 235, "duration": 25, "class": "P03", "gren": "Kula"},
    {"id": "12", "day": "801", "starttime": 265, "duration": 50, "class": "P05", "gren": "Kula"},
    {"id": "32", "day": "801", "starttime": 315, "duration": 80, "class": "F05", "gren": "Kula"},
];

const comp2018eventsTest = [
    {id: "P1160m", day: "lördag", starttime: "09:00", duration: "15", class: "P11", gren: "60m"},
    {id: "F11höjd", day: "lördag", starttime: "09:00", duration: "60", class: "F11", gren: "höjd"},
    {id: "F12kula", day: "lördag", starttime: "09:00", duration: "60", class: "F12", gren: "kula"},
    {id: "F13längd", day: "lördag", starttime: "09:10", duration: "45", class: "F13", gren: "längd"},
    {id: "F960m", day: "lördag", starttime: "09:15", duration: "15", class: "F9", gren: "60m"},
    {id: "P960m", day: "lördag", starttime: "09:30", duration: "21", class: "P9", gren: "60m"},
    {id: "F1560m", day: "lördag", starttime: "09:51", duration: "15", class: "F15", gren: "60m"},
    {id: "P1560m", day: "lördag", starttime: "10:06", duration: "9", class: "P15", gren: "60m"},
    {id: "F1160m", day: "lördag", starttime: "10:15", duration: "21", class: "F11", gren: "60m"},
    {id: "P13längd", day: "lördag", starttime: "10:20", duration: "20", class: "P13", gren: "längd"},
    {id: "P11höjd", day: "lördag", starttime: "10:20", duration: "40", class: "P11", gren: "höjd"},
    {id: "P860m", day: "lördag", starttime: "10:36", duration: "12", class: "P8", gren: "60m"},
    {id: "P12kula", day: "lördag", starttime: "10:40", duration: "45", class: "P12", gren: "kula"},
    {id: "F860m", day: "lördag", starttime: "10:48", duration: "12", class: "F8", gren: "60m"},
    {id: "F1260m", day: "lördag", starttime: "11:00", duration: "21", class: "F12", gren: "60m"},
    {id: "P9längd", day: "lördag", starttime: "11:20", duration: "45", class: "P9", gren: "längd"},
    {id: "F1360m", day: "lördag", starttime: "11:21", duration: "24", class: "F13", gren: "60m"},
    {id: "P15höjd", day: "lördag", starttime: "11:40", duration: "40", class: "P15", gren: "höjd"},
    {id: "P1360m", day: "lördag", starttime: "11:45", duration: "9", class: "P13", gren: "60m"},
    {id: "P1260m", day: "lördag", starttime: "11:54", duration: "15", class: "P12", gren: "60m"},
    {id: "F960m Final", day: "lördag", starttime: "12:09", duration: "5", class: "F9", gren: "60m Final"},
    {id: "F1560m Final", day: "lördag", starttime: "12:14", duration: "5", class: "F15", gren: "60m Final"},
    {id: "F860m Final", day: "lördag", starttime: "12:19", duration: "5", class: "F8", gren: "60m Final"},
    {id: "P860m Final", day: "lördag", starttime: "12:24", duration: "5", class: "P8", gren: "60m Final"},
    {id: "P960m Final", day: "lördag", starttime: "12:29", duration: "5", class: "P9", gren: "60m Final"},
    {id: "F9längd", day: "lördag", starttime: "12:30", duration: "30", class: "F9", gren: "längd"},
    {id: "F15vikt", day: "lördag", starttime: "12:30", duration: "30", class: "F15", gren: "vikt"},
    {id: "F1160m Final", day: "lördag", starttime: "12:34", duration: "5", class: "F11", gren: "60m Final"},
    {id: "P1160m Final", day: "lördag", starttime: "12:39", duration: "5", class: "P11", gren: "60m Final"},
    {id: "F1260m Final", day: "lördag", starttime: "12:44", duration: "5", class: "F12", gren: "60m Final"},
    {id: "P1260m Final", day: "lördag", starttime: "12:49", duration: "5", class: "P12", gren: "60m Final"},
    {id: "F1360m Final", day: "lördag", starttime: "12:54", duration: "5", class: "F13", gren: "60m Final"},
    {id: "P1360m Final", day: "lördag", starttime: "12:59", duration: "5", class: "P13", gren: "60m Final"},
    {id: "P1560m Final", day: "lördag", starttime: "13:04", duration: "10", class: "P15", gren: "60m Final"},
    {id: "F9400m", day: "lördag", starttime: "13:14", duration: "24", class: "F9", gren: "400m"},
    {id: "F8längd", day: "lördag", starttime: "13:20", duration: "35", class: "F8", gren: "längd"},
    {id: "P9400m", day: "lördag", starttime: "13:38", duration: "36", class: "P9", gren: "400m"},
    {id: "F15höjd", day: "lördag", starttime: "13:40", duration: "45", class: "F15", gren: "höjd"},
    {id: "P15vikt", day: "lördag", starttime: "13:40", duration: "30", class: "P15", gren: "vikt"},
    {id: "F11600m", day: "lördag", starttime: "14:14", duration: "30", class: "F11", gren: "600m"},
    {id: "P8längd", day: "lördag", starttime: "14:20", duration: "35", class: "P8", gren: "längd"},
    {id: "P11600m", day: "lördag", starttime: "14:44", duration: "18", class: "P11", gren: "600m"},
    {id: "F13600m", day: "lördag", starttime: "15:02", duration: "18", class: "F13", gren: "600m"},
    {id: "P13600m", day: "lördag", starttime: "15:20", duration: "18", class: "P13", gren: "600m"},
    {id: "P10höjd", day: "söndag", starttime: "09:00", duration: "60", class: "P10", gren: "höjd"},
    {id: "F13kula", day: "söndag", starttime: "09:20", duration: "60", class: "F13", gren: "kula"},
    {id: "P15stav", day: "söndag", starttime: "09:20", duration: "150", class: "P15", gren: "stav"},
    {id: "F1040mH", day: "söndag", starttime: "09:30", duration: "24", class: "F10", gren: "40mH"},
    {id: "P1040mH", day: "söndag", starttime: "09:54", duration: "29", class: "P10", gren: "40mH"},
    {id: "F10höjd", day: "söndag", starttime: "10:20", duration: "70", class: "F10", gren: "höjd"},
    {id: "P1160mH", day: "söndag", starttime: "10:23", duration: "9", class: "P11", gren: "60mH"},
    {id: "F1160mH", day: "söndag", starttime: "10:32", duration: "12", class: "F11", gren: "60mH"},
    {id: "F1260mH", day: "söndag", starttime: "10:44", duration: "15", class: "F12", gren: "60mH"},
    {id: "F1360mH", day: "söndag", starttime: "10:59", duration: "17", class: "F13", gren: "60mH"},
    {id: "P11kula", day: "söndag", starttime: "11:00", duration: "30", class: "P11", gren: "kula"},
    {id: "P1260mH", day: "söndag", starttime: "11:16", duration: "12", class: "P12", gren: "60mH"},
    {id: "P1360mH", day: "söndag", starttime: "11:28", duration: "9", class: "P13", gren: "60mH"},
    {id: "F1560mH", day: "söndag", starttime: "11:37", duration: "14", class: "F15", gren: "60mH"},
    {id: "P12höjd", day: "söndag", starttime: "11:50", duration: "45", class: "P12", gren: "höjd"},
    {id: "P1560mH", day: "söndag", starttime: "11:51", duration: "11", class: "P15", gren: "60mH"},
    {id: "P1040mH Final", day: "söndag", starttime: "12:02", duration: "5", class: "P10", gren: "40mH Final"},
    {id: "F1040mH Final", day: "söndag", starttime: "12:07", duration: "10", class: "F10", gren: "40mH Final"},
    {id: "F1160mH Final", day: "söndag", starttime: "12:17", duration: "5", class: "F11", gren: "60mH Final"},
    {id: "F15stav", day: "söndag", starttime: "12:20", duration: "180", class: "F15", gren: "stav"},
    {id: "F1260mH Final", day: "söndag", starttime: "12:22", duration: "5", class: "F12", gren: "60mH Final"},
    {id: "F1360mH Final", day: "söndag", starttime: "12:27", duration: "5", class: "F13", gren: "60mH Final"},
    {id: "P1160mH Final", day: "söndag", starttime: "12:32", duration: "10", class: "P11", gren: "60mH Final"},
    {id: "P1360mH Final", day: "söndag", starttime: "12:42", duration: "5", class: "P13", gren: "60mH Final"},
    {id: "P1260mH Final", day: "söndag", starttime: "12:47", duration: "8", class: "P12", gren: "60mH Final"},
    {id: "F1560mH Final", day: "söndag", starttime: "12:55", duration: "10", class: "F15", gren: "60mH Final"},
    {id: "F12höjd", day: "söndag", starttime: "12:55", duration: "60", class: "F12", gren: "höjd"},
    {id: "F11kula", day: "söndag", starttime: "12:55", duration: "25", class: "F11", gren: "kula"},
    {id: "P1560mH Final", day: "söndag", starttime: "13:05", duration: "10", class: "P15", gren: "60mH Final"},
    {id: "P12600m", day: "söndag", starttime: "13:15", duration: "18", class: "P12", gren: "600m"},
    {id: "P10600m", day: "söndag", starttime: "13:33", duration: "36", class: "P10", gren: "600m"},
    {id: "P13kula", day: "söndag", starttime: "13:50", duration: "30", class: "P13", gren: "kula"},
    {id: "F10600m", day: "söndag", starttime: "14:09", duration: "42", class: "F10", gren: "600m"},
    {id: "F13höjd", day: "söndag", starttime: "14:10", duration: "40", class: "F13", gren: "höjd"},
    {id: "F12600m", day: "söndag", starttime: "14:51", duration: "24", class: "F12", gren: "600m"},
    {id: "P13höjd", day: "söndag", starttime: "15:10", duration: "45", class: "P13", gren: "höjd"},
    {id: "P15800m", day: "söndag", starttime: "15:15", duration: "18", class: "P15", gren: "800m"},
    {id: "F15800m", day: "söndag", starttime: "15:33", duration: "24", class: "F15", gren: "800m"}
];

var SERVERdxaTest = [
    {"day": "801", "arenas": ["911", "912", "913", "914", "915", "916", "917"]},
  ];

const comp2018dxaTest = [
    {"day": "lördag", "arenas": ["kula", "stav", "längd", "höjd", "löpning"]},
    {"day": "söndag", "arenas": ["kula", "stav", "längd", "höjd", "löpning"]}
];

var SERVERaxeTest = [
    {"arena": "911", "events": ["13","25","5","21","1","33","100","101","102","103","36","104","16","105","29","9","106","107","39","19","108","14","34","6","109","110","111","26","10","30","37","17","22","2"]},
    {"arena": "912", "events": ["5633","5433","3233","6433","4533","7133","4433","5033"]},
    {"arena": "913", "events": ["5644","5444","3244","6444","4544","7144","4444","5044"]},
    {"arena": "914", "events": ["31a","11a","3"]},
    {"arena": "915", "events": ["31b","11b","23"]},
    {"arena": "916", "events": ["8","24","28","4","12","32"]},
    {"arena": "917", "events": []},
  ];

const comp2018axeTest = [
    {"arena": "löpning", "events": []},
    {"arena": "kula", "events": []},
    {"arena": "stav", "events": []},
    {"arena": "höjd", "events": []},
    {"arena": "längd", "events": []},
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

export const comptest = SERVERcontestTest2017;

import { newID } from '../misc';

const hoppGrenar = [
  "höjd",
  "tresteg",
  "längd",
  "stav",
];

const kastGrenar = [
  "spjut",
  "diskus",
  "slägga",
  "kula",
  "vikt",
];

const runGrenar = [
  "60m",
  "60mH",
  "80m",
  "80mH",
  "100m",
  "110mH",
  "200m",
  "200mH",
  "300m",
  "400m",
  "600m",
  "800m",
  "1500m",
  "3000m",
  "5000m",
  "10000m",
];

const youthClasses = ["F8", "P8", "F9", "P9", "F11", "P11", "F13", "P13", "F15", "P15", "F17", "P17"];
const juniorClasses = ["K19", "M19", "K22", "M22"];
const seniorClasses = ["K", "M"];


function genNameObj(label) {
  let x = {id: newID(), name: label};
  return x;
};

const templateYouth = {
  "key": "templateY",
  "name": "Template Youth Competition",
  "version": "template",
  "days": [],
  "arenas": [],
  "classes": youthClasses.map(x => genNameObj(x)),
  "grenar": runGrenar.concat(hoppGrenar).concat(kastGrenar).map(x => genNameObj(x)),
  "events": [],
};

const templateData = [templateYouth];

export const templateKeys = templateData.map(x => x.name);
export function getTemplateData (key) {
  return templateData.find(data => data.name === key);
}

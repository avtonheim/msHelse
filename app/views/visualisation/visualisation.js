var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;

var pageSymptom = new Observable();
pageSymptom.Symptoms = [
  { type: "Fatigue", count: 20 },
  { type: "Svimmel", count: 10 },
  { type: "Dårleg syn",count: 0 },
  { type: "Spasme", count: 5 },
  { type: "Vannlatning", count: 14 },
  { type: "Hovudverk", count: 4 },
  { type: "Søvn", count: 9 }
];

exports.pageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = pageSymptom;
};

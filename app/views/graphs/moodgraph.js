var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;

var pageMood = new Observable();
  pageMood.moodGraph = [
        { Dag: "Mån", Dagsform: 0},
        { Dag: "Tys", Dagsform: 5},
        { Dag: "Ons", Dagsform: 10},
        { Dag: "Tor", Dagsform: 5},
        { Dag: "Fre", Dagsform: 5},
        { Dag: "Lør", Dagsform: 0},
        { Dag: "Søn", Dagsform: 5}
];

function onPageLoaded(args){
    var page = args.object;
    page.bindingContext = pageMood;
} exports.onPageLoaded = onPageLoaded;

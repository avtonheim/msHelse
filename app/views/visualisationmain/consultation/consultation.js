var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var builder = require('ui/builder');
var fs = require('file-system');

exports.onLoad = function(args) {
  var page = args.object;
  var stackSymptom = page.getViewById('symptomGraph');
  var stackMood = page.getViewById('moodGraph');
  var symptomText = page.getViewById('symptomText');
  var moodText = page.getViewById('moodText');

  // Load our JS for the component
  var path = fs.knownFolders.currentApp().path;
  var componentSymptomJS = require(path + '/views/graphs/symptomgraph.js');
  var componentMoodJS = require(path + '/views/graphs/moodgraphanalysis.js');
  var componentSymptomTextJS = require(path + '/views/visualisationmain/consultationcards/symptomcard.js');
  var componentMoodTextJS = require(path + '/views/visualisationmain/consultationcards/moodcard.js');

  // Actually have the builder build the Component using the XML & JS.
  var componentSymptomXML = builder.load(path + '/views/graphs/symptomgraph.xml', componentSymptomJS);
  var componentMoodXML = builder.load(path + '/views/graphs/moodgraphanalysis.xml', componentMoodJS);
  var componentMoodXML = builder.load(path + '/views/graphs/moodgraphanalysis.xml', componentMoodJS);
  var componentSymptomTextXML = builder.load(path + '/views/visualisationmain/consultationcards/symptomcard.xml', componentSymptomTextJS);
  var componentMoodTextXML = builder.load(path + '/views/visualisationmain/consultationcards/moodcard.xml', componentMoodTextJS);

  // And add our component to the visual tree
  stackSymptom.addChild(componentSymptomXML);
  stackMood.addChild(componentMoodXML);
  symptomText.addChild(componentSymptomTextXML);
  moodText.addChild(componentMoodTextXML);


};

var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var builder = require('ui/builder');
var fs = require('file-system');

exports.onLoad = function(args) {
  var page = args.object;
  var stackSymptom = page.getViewById('symptomGraph');
  var stackMood = page.getViewById('moodGraph');
  var stackSymptomTextVisual = page.getViewById('symptomTextVisual');
  var stackMoodTextVisual = page.getViewById('moodTextVisual');

  // Load our JS for the component
  var path = fs.knownFolders.currentApp().path;
  var componentSymptomJS = require(path + '/views/graphs/symptomgraph.js');
  var componentMoodJS = require(path + '/views/graphs/moodgraph.js');
  var componentSymptomVisualTextJS = require(path + '/views/visualisationmain/visualisationcards/symptomcardvisual.js');
  var componentMoodVisualTextJS = require(path + '/views/visualisationmain/visualisationcards/moodcardvisual.js');

  // Actually have the builder build the Component using the XML & JS.
  var componentSymptomXML = builder.load(path + '/views/graphs/symptomgraph.xml', componentSymptomJS);
  var componentMoodXML = builder.load(path + '/views/graphs/moodgraph.xml', componentMoodJS);
  var componentSymptomTextVisualXML = builder.load(path + '/views/visualisationmain/visualisationcards/symptomcardvisual.xml', componentSymptomVisualTextJS);
  var componentMoodTextVisualXML = builder.load(path + '/views/visualisationmain/visualisationcards/moodcardvisual.xml', componentMoodVisualTextJS);

  // And add our component to the visual tree
  stackSymptom.addChild(componentSymptomXML);
  stackMood.addChild(componentMoodXML);
  stackSymptomTextVisual.addChild(componentSymptomTextVisualXML);
  stackMoodTextVisual.addChild(componentMoodTextVisualXML);
};

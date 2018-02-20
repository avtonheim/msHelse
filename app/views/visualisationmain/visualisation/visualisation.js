var observable = require("data/observable").Observable;
var builder = require('ui/builder');
var fs = require('file-system');

var pageData = new observable();

exports.onLoad = function(args) {
  var page = args.object;
  var stackSymptom = page.getViewById('symptomGraph');
  var stackMood = page.getViewById('moodGraph');
  var stackSymptomTextVisual = page.getViewById('symptomTextVisual');
  var stackMoodTextVisual = page.getViewById('moodTextVisual');
  var stackDetailed = page.getViewById('detailedGraph');

  // Load our JS for the component
  var path = fs.knownFolders.currentApp().path;
  var componentSymptomJS = require(path + '/views/graphs/patientOverview/symptomgraph.js');
  var componentMoodJS = require(path + '/views/graphs/patientOverview/moodgraph.js');
  var componentSymptomVisualTextJS = require(path + '/views/visualisationmain/visualisation/visualisationcards/symptomcardvisual.js');
  var componentMoodVisualTextJS = require(path + '/views/visualisationmain/visualisation/visualisationcards/moodcardvisual.js');
  var componentDetailedJS = require(path + '/views/graphs/patientOverview/detailedinformation/symptomdetailed.js');

  // Actually have the builder build the Component using the XML & JS.
  var componentSymptomXML = builder.load(path + '/views/graphs/patientOverview/symptomgraph.xml', componentSymptomJS);
  var componentMoodXML = builder.load(path + '/views/graphs/patientOverview/moodgraph.xml', componentMoodJS);
  var componentSymptomTextVisualXML = builder.load(path + '/views/visualisationmain/visualisation/visualisationcards/symptomcardvisual.xml', componentSymptomVisualTextJS);
  var componentMoodTextVisualXML = builder.load(path + '/views/visualisationmain/visualisation/visualisationcards/moodcardvisual.xml', componentMoodVisualTextJS);
  var componentDetailedXML = builder.load(path + '/views/graphs/patientOverview/detailedinformation/symptomdetailed.xml', componentDetailedJS);

  // And add our component to the visual tree
  stackSymptom.addChild(componentSymptomXML);
  stackMood.addChild(componentMoodXML);
  stackSymptomTextVisual.addChild(componentSymptomTextVisualXML);
  stackMoodTextVisual.addChild(componentMoodTextVisualXML);
  stackDetailed.addChild(componentDetailedXML);

  pageData.set("showDetails", false);
  args.object.bindingContext = pageData;
};

/*Toggle detailed graph and overview graph!*/
function detailsToggle(args){
  pageData.set("showDetails", !pageData.get("showDetails"));
}

exports.detailsToggle = detailsToggle;

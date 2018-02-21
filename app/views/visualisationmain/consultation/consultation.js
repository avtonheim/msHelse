var builder = require('ui/builder');
var fs = require('file-system');


exports.onLoad = function(args) {
  var page = args.object;
  var stackSymptom = page.getViewById('symptomGraph');
  var stackMood = page.getViewById('moodGraph');
  var symptomText = page.getViewById('symptomText');
  var moodText = page.getViewById('moodText');
  var stackDetailed = page.getViewById('symptomDetailed');

  // Load our JS for the component
  var path = fs.knownFolders.currentApp().path;
  var componentSymptomJS = require(path + '/views/graphs/consultation/symptomgraphanalysis.js');
  var componentMoodJS = require(path + '/views/graphs/consultation/moodgraphanalysis.js');
  var componentSymptomTextJS = require(path + '/views/visualisationmain/consultation/consultationcards/symptomcard.js');
  var componentMoodTextJS = require(path + '/views/visualisationmain/consultation/consultationcards/moodcard.js');
  var componentDetailedJS = require(path + '/views/graphs/consultation/detailedinformation/symptomdetailed.js');

  // Actually have the builder build the Component using the XML & JS.
  var componentSymptomXML = builder.load(path + '/views/graphs/consultation/symptomgraphanalysis.xml', componentSymptomJS);
  var componentMoodXML = builder.load(path + '/views/graphs/consultation/moodgraphanalysis.xml', componentMoodJS);
  var componentMoodXML = builder.load(path + '/views/graphs/consultation/moodgraphanalysis.xml', componentMoodJS);
  var componentSymptomTextXML = builder.load(path + '/views/visualisationmain/consultation/consultationcards/symptomcard.xml', componentSymptomTextJS);
  var componentMoodTextXML = builder.load(path + '/views/visualisationmain/consultation/consultationcards/moodcard.xml', componentMoodTextJS);
  var componentDetailedXML = builder.load(path + '/views/graphs/consultation/detailedinformation/symptomdetailed.xml', componentDetailedJS);

  // And add our component to the visual tree
  stackSymptom.addChild(componentSymptomXML);
  stackMood.addChild(componentMoodXML);
  symptomText.addChild(componentSymptomTextXML);
  moodText.addChild(componentMoodTextXML);
  stackDetailed.addChild(componentDetailedXML);
};

const observableModule = require("tns-core-modules/data/observable");
var builder = require('ui/builder');
var fs = require('file-system');


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
  var componentDetailedJS = require(path + '/views/graphs/patientOverview/detailedInformation/symptomdetailed.js');

  // Actually have the builder build the Component using the XML & JS.
  var componentSymptomXML = builder.load(path + '/views/graphs/patientOverview/symptomgraph.xml', componentSymptomJS);
  var componentMoodXML = builder.load(path + '/views/graphs/patientOverview/moodgraph.xml', componentMoodJS);
  var componentSymptomTextVisualXML = builder.load(path + '/views/visualisationmain/visualisation/visualisationcards/symptomcardvisual.xml', componentSymptomVisualTextJS);
  var componentMoodTextVisualXML = builder.load(path + '/views/visualisationmain/visualisation/visualisationcards/moodcardvisual.xml', componentMoodVisualTextJS);
  var componentDetailedXML = builder.load(path + '/views/graphs/patientOverview/detailedInformation/symptomdetailed.xml', componentDetailedJS);

  // And add our component to the visual tree
  stackSymptom.addChild(componentSymptomXML);
  stackMood.addChild(componentMoodXML);
  stackSymptomTextVisual.addChild(componentSymptomTextVisualXML);
  stackMoodTextVisual.addChild(componentMoodTextVisualXML);
  stackDetailed.addChild(componentDetailedXML);
};

exports.onNavigatingTo = function(args) {
  const page = args.object;
  // set up the SegmentedBar selected index
  const vm = new observableModule.Observable();
  vm.set("prop", 0);
  vm.set("sbSelectedIndex", 0);
  vm.set("visibility1", true);
  vm.set("visibility2", false);
  // handle selected index change
  vm.on(observableModule.Observable.propertyChangeEvent, (propertyChangeData) => {
      if (propertyChangeData.propertyName === "sbSelectedIndex") {
          vm.set("prop", propertyChangeData.value);
      }
  });
  page.bindingContext = vm;
}

exports.sbLoaded = function(args) {
  // handle selected index change
  const segmentedBarComponent = args.object;
  segmentedBarComponent.on("selectedIndexChange", (sbargs) => {
      const page = sbargs.object;
      const vm = page.bindingContext;
      const selectedIndex = sbargs.object.selectedIndex;
      vm.set("prop", selectedIndex);
      switch (selectedIndex) {
          case 0:
              vm.set("visibility1", true);
              vm.set("visibility2", false);
              break;
          case 1:
              vm.set("visibility1", false);
              vm.set("visibility2", true);
              break;
          default:
              break;
      }
  });
}

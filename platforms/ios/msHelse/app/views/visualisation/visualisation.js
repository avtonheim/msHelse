var createViewModel = require("../diary/mood/mood-view-model").createViewModel;
var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var builder = require('ui/builder');
var fs = require('file-system');

exports.onLoad = function(args) {
  var page = args.object;
  var stackSymptom = page.getViewById('symptomGraph');
  var stackMood = page.getViewById('moodGraph');

  // Load our JS for the component
  var path = fs.knownFolders.currentApp().path;
  var componentSymptomJS = require(path + '/views/graphs/symptomgraph.js');
  var componentMoodJS = require(path + '/views/graphs/moodgraph.js');

  // Actually have the builder build the Component using the XML & JS.
  var componentSymptomXML = builder.load(path + '/views/graphs/symptomgraph.xml', componentSymptomJS);
  var componentMoodXML = builder.load(path + '/views/graphs/moodgraph.xml', componentMoodJS);

  // And add our component to the visual tree
  stackSymptom.addChild(componentSymptomXML);
  stackMood.addChild(componentMoodXML);

  if (!Sqlite.exists("populated.db")) {
          Sqlite.copyDatabase("populated.db");
      }
  (new Sqlite("populated.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS mood (id INTEGER PRIMARY KEY AUTOINCREMENT, moodState INT, timestamp INT)").then(id => {
             page.bindingContext = createViewModel(db);
              console.log("Database Saved!");
         }, error => {
             console.log("CREATE TABLE ERROR", error);
         });
     }, error => {
         console.log("OPEN DB ERROR", error);
     });
};

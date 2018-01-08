var createViewModelSymptom = require("../../diary/mood/mood-view-model").createViewModel;
var createViewModelMood = require("../../diary/symptoms/symptoms-view-model").createViewModel;
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
  var componentMoodJS = require(path + '/views/graphs/moodgraphanalysis.js');

  // Actually have the builder build the Component using the XML & JS.
  var componentSymptomXML = builder.load(path + '/views/graphs/symptomgraph.xml', componentSymptomJS);
  var componentMoodXML = builder.load(path + '/views/graphs/moodgraphanalysis.xml', componentMoodJS);

  // And add our component to the visual tree
  stackSymptom.addChild(componentSymptomXML);
  stackMood.addChild(componentMoodXML);

  /*Database for mood*/
  if (!Sqlite.exists("populated.db")) {
          Sqlite.copyDatabase("populated.db");
      }
  (new Sqlite("populated.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS mood (id INTEGER PRIMARY KEY AUTOINCREMENT, moodState INT, timestamp INT)").then(id => {
             page.bindingContext = createViewModelMood(db);
              console.log("Database Saved!");
         }, error => {
             console.log("CREATE TABLE ERROR", error);
         });
     }, error => {
         console.log("OPEN DB ERROR", error);
     });

    /*Database for symptoms*/
     if (!Sqlite.exists("populated.db")) {
             Sqlite.copyDatabase("populated.db");
         }
         (new Sqlite("populated.db")).then(db => {
             db.execSQL("CREATE TABLE IF NOT EXISTS symptoms (id INTEGER PRIMARY KEY AUTOINCREMENT, symptom TEXT, morning INT, evening INT, timestamp INT)").then(id => {
                 page.bindingContext = createViewModelSymptom(db);
             }, error => {
                 console.log("CREATE TABLE ERROR", error);
             });
         }, error => {
             console.log("OPEN DB ERROR", error);
         });

};

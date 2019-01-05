var createViewModel = require("./symptoms-view-model").createViewModel;
const ListPicker = require("tns-core-modules/ui/list-picker").ListPicker;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');
var observable = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var Dialogs = require("ui/dialogs");
var fs = require('file-system');

var pageData = new observable.Observable();
selectedSymptoms = new ObservableArray([]);
symptomList = new ObservableArray([]);


function onNavigatingTo(args){
  var controller = frameModule.topmost().ios.controller;
  var navigationItem = controller.visibleViewController.navigationItem;
  navigationItem.setHidesBackButtonAnimated(true, false);

  

  loadDatabase(args);
  loadJSON(args);   
}

function loadDatabase(args){
      var page = args.object;
      if (!Sqlite.exists("populated.db")) {
        Sqlite.copyDatabase("populated.db");
    }
    (new Sqlite("populated.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS symptoms (id INTEGER PRIMARY KEY AUTOINCREMENT, symptom TEXT, morning INT, evening INT, timestamp INT)").then(id => {
            page.bindingContext = createViewModel(db);
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });
} exports.loadDatabase = loadDatabase;


function loadJSON(args){
  const path = fs.knownFolders.currentApp().path;
  const symptomsJSON = require(path + '/views/diary/symptoms/symptoms.json');

  this.symptomList = new ObservableArray([]); 
  console.log(symptomsJSON.symptomList); // "debug"
  this.selectedSymptoms.push(symptomsJSON.symptomList);

  createListPicker(args);
} exports.loadJSON = loadJSON;

function createListPicker(args){
    const page = args.object;
    const container = page.getViewById("container");
    const listPicker = new ListPicker();
    listPicker.items = this.selectedSymptoms;
    listPicker.selectedIndex = 0;
    container.addChild(listPicker);
} exports.createListPicker = createListPicker;


function loaded(args){
  pageData.set("showDetails0", true);
  pageData.set("showDetails1", true);
  pageData.set("showDetails2", true);
  pageData.set("showDetails3", true);
  pageData.set("showDetails4", true);
  args.object.bindingContext = pageData;
}

function tapHome(){
  Dialogs.confirm({
      title: "Vil du avbryte?",
      okButtonText: "Ja",
      cancelButtonText: "Avbryt"
  }).then(function (result) {
      if (result === true) {
      frameModule.topmost().navigate('views/home-page/home-page');
    }
  });
}

function onNavText(){
  frameModule.topmost().navigate('views/diary/text/text');
}
/*Ugly workaround!!*/
function toggle0(args){
	pageData.set("showDetails0", !pageData.get("showDetails0"));
}
function toggle1(args){
	pageData.set("showDetails1", !pageData.get("showDetails1"));
}
function toggle2(args){
  pageData.set("showDetails2", !pageData.get("showDetails2"));
}
function toggle3(args){
	pageData.set("showDetails3", !pageData.get("showDetails3"));
}
function toggle4(args){
  pageData.set("showDetails4", !pageData.get("showDetails4"));
}

exports.onNavigatingTo = onNavigatingTo;
exports.loaded = loaded;
exports.tapHome = tapHome;
exports.onNavText = onNavText;
exports.toggle0 = toggle0;
exports.toggle1 = toggle1;
exports.toggle2 = toggle2;
exports.toggle3 = toggle3;
exports.toggle4 = toggle4;

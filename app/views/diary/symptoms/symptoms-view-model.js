var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var ObservableArray = require("data/observable-array").ObservableArray;

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Symptoms = new ObservableArray([]);

    viewModel.insert = function(args) {
          var symptomType = args.object.context;
          var eventVal = args.object.value; //day or night
          var eventTime = args.object.text;
          var morgonVal = 0;
          var kveldVal = 0;
            if(eventTime == "Kveld"){
              var kveldVal = 1;
          } if(eventTime == "Morgon"){
              var morgonVal = 1;
          }
          var btn = args.object;
          btn.backgroundColor = "#3489db";
              database.execSQL("INSERT INTO symptoms (symptom, morning, evening, timestamp) VALUES (?, ?, ?, date())", [symptomType, morgonVal, kveldVal]).then(id => {
                  console.log("The new record id is: " + symptomType + " " + morgonVal + " " + kveldVal);
              }, error => {
              console.log("INSERT ERROR", error);
          });
      }



      viewModel.selectEverything = function() {
            database.all("SELECT * FROM symptoms group by symptom").then(rows => {
                for(var row in rows) {

                }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }

        viewModel.selectMorn = function() {
          this.Symptoms = new ObservableArray([]);
              database.all("SELECT *, count(symptom) FROM symptoms group by symptom").then(rows => {
                  for(var row in rows) {
                   this.Symptoms.push({id: rows[row][0], type: rows[row][1], morncount: rows[row][2], evncount: rows[row][3], timestamp: rows[row][4], count: rows[row][5]});
                   console.log("Morgon" + rows[row]);
                  }
              }, error => {
                  console.log("SELECT ERROR", error);
              });
          }



    viewModel.selectMorn();
    return viewModel;
}
exports.createViewModel = createViewModel;

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
                 console.log("Dette er alt " + rows[row]);
                }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }

//

      viewModel.select = function() {
        this.Symptoms = new ObservableArray([]);
            database.all("SELECT symptom, count(symptom), morning, evening, timestamp FROM symptoms group by symptom").then(rows => {
                for(var row in rows) {
                 this.Symptoms.push({type: rows[row][0], count: rows[row][1], morning: rows[row][2], evening: rows[row][3], timestamp: rows[row][4]});
                 console.log(rows[row]);
                }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }

    viewModel.select();

    return viewModel;
}
exports.createViewModel = createViewModel;
